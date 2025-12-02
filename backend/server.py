from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File, Form, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr, ConfigDict, validator
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
from passlib.context import CryptContext
from jose import JWTError, jwt
import re
import aiofiles
import base64
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()
SECRET_KEY = os.environ.get("SECRET_KEY", "your-secret-key-change-in-production-123456789")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

# File upload directory
UPLOAD_DIR = ROOT_DIR / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)


# ============ ENUMS ============
class CaseStatus(str, Enum):
    PENDING = "pending"
    DOCUMENTS_VERIFIED = "documents_verified"
    FREEZE_COMPLETED = "freeze_completed"
    LETTERS_SENT = "letters_sent"
    FTC_CREATED = "ftc_created"
    CFPB_FILED = "cfpb_filed"
    RESULT_RECEIVED = "result_received"
    COMPLETED = "completed"


class UserRole(str, Enum):
    CLIENT = "client"
    ADMIN = "admin"


# ============ MODELS ============
class ClientSubmission(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r'^\+?1?\d{9,15}$')
    date_of_birth: str
    ssn: str = Field(..., pattern=r'^\d{3}-\d{2}-\d{4}$')
    address: str = Field(..., min_length=5)
    city: str = Field(..., min_length=2)
    state: str = Field(..., min_length=2, max_length=2)
    zip_code: str = Field(..., pattern=r'^\d{5}(-\d{4})?$')
    agreed_to_terms: bool = Field(..., description="Must agree to terms")


class Client(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    first_name: str
    last_name: str
    email: EmailStr
    phone: str
    date_of_birth: str
    ssn: str  # Will be encrypted in production
    address: str
    city: str
    state: str
    zip_code: str
    case_status: CaseStatus = CaseStatus.PENDING
    documents: Dict[str, str] = Field(default_factory=dict)  # filename: file_id
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status_history: List[Dict[str, Any]] = Field(default_factory=list)
    notes: str = ""


class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    hashed_password: str
    role: UserRole
    client_id: Optional[str] = None  # Link to client if role is CLIENT
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True


class Token(BaseModel):
    access_token: str
    token_type: str
    role: UserRole
    user_id: str


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class StatusUpdate(BaseModel):
    status: CaseStatus
    notes: Optional[str] = None


class CaseStageInfo(BaseModel):
    status: CaseStatus
    timestamp: datetime
    notes: str = ""


# ============ HELPER FUNCTIONS ============
def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def generate_password(length: int = 12) -> str:
    """Generate a random password"""
    import secrets
    import string
    alphabet = string.ascii_letters + string.digits
    return ''.join(secrets.choice(alphabet) for i in range(length))


async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = await db.users.find_one({"id": user_id}, {"_id": 0})
    if user is None:
        raise credentials_exception
    return User(**user)


async def get_current_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions"
        )
    return current_user


async def save_file(file: UploadFile) -> str:
    """Save uploaded file and return file ID"""
    file_id = str(uuid.uuid4())
    file_extension = Path(file.filename).suffix
    file_path = UPLOAD_DIR / f"{file_id}{file_extension}"
    
    async with aiofiles.open(file_path, 'wb') as f:
        content = await file.read()
        await f.write(content)
    
    # Save file metadata to DB
    file_doc = {
        "id": file_id,
        "filename": file.filename,
        "path": str(file_path),
        "size": len(content),
        "uploaded_at": datetime.now(timezone.utc).isoformat()
    }
    await db.files.insert_one(file_doc)
    
    return file_id


# ============ API ROUTES ============

@api_router.get("/")
async def root():
    return {"message": "Credit Repair Automation System API"}


# ============ AUTHENTICATION ============
@api_router.post("/auth/login", response_model=Token)
async def login(login_data: LoginRequest):
    """Login for both clients and admins"""
    user = await db.users.find_one({"email": login_data.email}, {"_id": 0})
    
    if not user or not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    if not user.get("is_active", True):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is inactive"
        )
    
    access_token = create_access_token(data={"sub": user["id"]})
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": user["role"],
        "user_id": user["id"]
    }


@api_router.get("/auth/me")
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current user info"""
    user_data = current_user.model_dump()
    user_data.pop("hashed_password", None)
    return user_data


# ============ CLIENT SUBMISSION ============
@api_router.post("/clients/submit")
async def submit_client_application(
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    date_of_birth: str = Form(...),
    ssn: str = Form(...),
    address: str = Form(...),
    city: str = Form(...),
    state: str = Form(...),
    zip_code: str = Form(...),
    agreed_to_terms: bool = Form(...),
    driver_license: UploadFile = File(...),
    billing_address_proof: UploadFile = File(...)
):
    """Submit new client application"""
    
    # Validate terms agreement
    if not agreed_to_terms:
        raise HTTPException(status_code=400, detail="Must agree to terms and conditions")
    
    # Check if email already exists
    existing_user = await db.users.find_one({"email": email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    # Save files
    dl_file_id = await save_file(driver_license)
    billing_file_id = await save_file(billing_address_proof)
    
    # Create client
    client_data = Client(
        first_name=first_name,
        last_name=last_name,
        email=email,
        phone=phone,
        date_of_birth=date_of_birth,
        ssn=ssn,
        address=address,
        city=city,
        state=state,
        zip_code=zip_code,
        documents={
            "driver_license": dl_file_id,
            "billing_address_proof": billing_file_id
        },
        status_history=[{
            "status": CaseStatus.PENDING,
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "notes": "Application submitted"
        }]
    )
    
    client_dict = client_data.model_dump()
    client_dict['created_at'] = client_dict['created_at'].isoformat()
    client_dict['updated_at'] = client_dict['updated_at'].isoformat()
    
    await db.clients.insert_one(client_dict)
    
    # Generate password and create user account
    password = generate_password()
    user_data = User(
        email=email,
        hashed_password=get_password_hash(password),
        role=UserRole.CLIENT,
        client_id=client_data.id
    )
    
    user_dict = user_data.model_dump()
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    # In production, send email with password
    # For now, return it in response
    
    return {
        "success": True,
        "message": "Application submitted successfully",
        "client_id": client_data.id,
        "email": email,
        "password": password,  # In production, send via email only
        "note": "Save this password to access your client portal"
    }


# ============ CLIENT ROUTES ============
@api_router.get("/clients/me/dashboard")
async def get_client_dashboard(current_user: User = Depends(get_current_user)):
    """Get client's own dashboard data"""
    
    if current_user.role != UserRole.CLIENT:
        raise HTTPException(status_code=403, detail="Only clients can access this endpoint")
    
    client = await db.clients.find_one({"id": current_user.client_id}, {"_id": 0})
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Get file info for documents
    documents_info = {}
    for doc_type, file_id in client.get("documents", {}).items():
        file_doc = await db.files.find_one({"id": file_id}, {"_id": 0})
        if file_doc:
            documents_info[doc_type] = {
                "filename": file_doc["filename"],
                "uploaded_at": file_doc["uploaded_at"]
            }
    
    client["documents_info"] = documents_info
    
    return client


# ============ ADMIN ROUTES ============
@api_router.get("/admin/clients")
async def get_all_clients(
    status: Optional[CaseStatus] = None,
    current_admin: User = Depends(get_current_admin)
):
    """Get all clients (admin only)"""
    
    query = {}
    if status:
        query["case_status"] = status
    
    clients = await db.clients.find(query, {"_id": 0}).to_list(1000)
    
    # Convert ISO strings back to datetime for each client
    for client in clients:
        if isinstance(client.get('created_at'), str):
            client['created_at'] = datetime.fromisoformat(client['created_at'])
        if isinstance(client.get('updated_at'), str):
            client['updated_at'] = datetime.fromisoformat(client['updated_at'])
    
    return clients


@api_router.get("/admin/clients/{client_id}")
async def get_client_detail(
    client_id: str,
    current_admin: User = Depends(get_current_admin)
):
    """Get detailed client information (admin only)"""
    
    client = await db.clients.find_one({"id": client_id}, {"_id": 0})
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Get file info for documents
    documents_info = {}
    for doc_type, file_id in client.get("documents", {}).items():
        file_doc = await db.files.find_one({"id": file_id}, {"_id": 0})
        if file_doc:
            documents_info[doc_type] = {
                "id": file_id,
                "filename": file_doc["filename"],
                "size": file_doc["size"],
                "uploaded_at": file_doc["uploaded_at"]
            }
    
    client["documents_info"] = documents_info
    
    return client


@api_router.patch("/admin/clients/{client_id}/status")
async def update_client_status(
    client_id: str,
    status_update: StatusUpdate,
    current_admin: User = Depends(get_current_admin)
):
    """Update client case status (admin only)"""
    
    client = await db.clients.find_one({"id": client_id}, {"_id": 0})
    
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    
    # Add to status history
    status_entry = {
        "status": status_update.status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "notes": status_update.notes or f"Status updated to {status_update.status}"
    }
    
    # Update client
    await db.clients.update_one(
        {"id": client_id},
        {
            "$set": {
                "case_status": status_update.status,
                "updated_at": datetime.now(timezone.utc).isoformat(),
                "notes": status_update.notes or client.get("notes", "")
            },
            "$push": {
                "status_history": status_entry
            }
        }
    )
    
    return {"success": True, "message": "Status updated successfully"}


@api_router.get("/admin/stats")
async def get_admin_stats(current_admin: User = Depends(get_current_admin)):
    """Get dashboard statistics (admin only)"""
    
    total_clients = await db.clients.count_documents({})
    
    # Count by status
    status_counts = {}
    for status_value in CaseStatus:
        count = await db.clients.count_documents({"case_status": status_value})
        status_counts[status_value.value] = count
    
    # Recent clients
    recent_clients = await db.clients.find(
        {},
        {"_id": 0, "first_name": 1, "last_name": 1, "email": 1, "case_status": 1, "created_at": 1}
    ).sort("created_at", -1).limit(10).to_list(10)
    
    return {
        "total_clients": total_clients,
        "status_counts": status_counts,
        "recent_clients": recent_clients
    }


# ============ INITIAL ADMIN CREATION ============
@api_router.post("/admin/create-initial", include_in_schema=False)
async def create_initial_admin(password: str = "admin123"):
    """Create initial admin user - should be called once"""
    
    # Check if admin already exists
    existing_admin = await db.users.find_one({"role": UserRole.ADMIN})
    if existing_admin:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    admin_user = User(
        email="admin@cras.com",
        hashed_password=get_password_hash(password),
        role=UserRole.ADMIN
    )
    
    admin_dict = admin_user.model_dump()
    admin_dict['created_at'] = admin_dict['created_at'].isoformat()
    
    await db.users.insert_one(admin_dict)
    
    return {"success": True, "message": "Initial admin created", "email": "admin@cras.com"}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
