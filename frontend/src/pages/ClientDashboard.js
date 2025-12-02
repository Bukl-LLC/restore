import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clientAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  LogOut, 
  User, 
  Calendar,
  Mail,
  Phone,
  MapPin,
  CreditCard
} from 'lucide-react';

// Simplified status mapping for client view
const statusMapping = {
  pending: 'application_received',
  documents_verified: 'documents_verified',
  freeze_completed: 'credit_clean_initiated',
  letters_sent: 'credit_clean_initiated',
  ftc_created: 'credit_clean_initiated',
  cfpb_filed: 'credit_clean_initiated',
  result_received: 'credit_clean_initiated',
  completed: 'service_support_paid',
};

const clientStages = [
  {
    key: 'application_received',
    title: 'Application Received',
    description: 'Your application has been successfully submitted and is being reviewed.',
    icon: FileText,
    color: 'bg-blue-500',
    progress: 25
  },
  {
    key: 'documents_verified',
    title: 'Documents Verified',
    description: 'All your documents have been verified and approved.',
    icon: CheckCircle2,
    color: 'bg-green-500',
    progress: 50
  },
  {
    key: 'credit_clean_initiated',
    title: 'Credit Clean Initiated',
    description: 'We have started the credit repair process. Our team is working on your case.',
    icon: CreditCard,
    color: 'bg-purple-500',
    progress: 75
  },
  {
    key: 'service_support_paid',
    title: 'Service Support Paid',
    description: 'Your service is complete! Credit repair process has been successfully finished.',
    icon: CheckCircle2,
    color: 'bg-emerald-600',
    progress: 100
  }
];

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await clientAPI.getDashboard();
      setClientData(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getCurrentClientStage = () => {
    if (!clientData) return 'application_received';
    return statusMapping[clientData.case_status] || 'application_received';
  };

  const getCurrentStageIndex = () => {
    const currentStage = getCurrentClientStage();
    return clientStages.findIndex(stage => stage.key === currentStage);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = getCurrentStageIndex();
  const currentStage = clientStages[currentStageIndex];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="client-dashboard">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome, {clientData?.first_name} {clientData?.last_name}
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Current Status Card */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Current Status</CardTitle>
                <CardDescription className="text-base mt-2">
                  {currentStage.description}
                </CardDescription>
              </div>
              <Badge className={`${currentStage.color} text-white text-lg px-4 py-2 border-2`}>
                {currentStage.title}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-600">{currentStage.progress}%</span>
                </div>
                <Progress value={currentStage.progress} className="h-3" />
                <p className="text-xs text-gray-500 mt-2">
                  Step {currentStageIndex + 1} of {clientStages.length}
                </p>
              </div>

              {/* Current Status Details */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-100">
                <div className="flex items-start gap-4">
                  <div className={`${currentStage.color} rounded-full p-3`}>
                    <currentStage.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{currentStage.title}</h3>
                    <p className="text-gray-700">{currentStage.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Service Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Service Timeline</CardTitle>
            <CardDescription>Track your credit repair journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {clientStages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isFuture = index > currentStageIndex;
                const StageIcon = stage.icon;

                return (
                  <div key={stage.key} className="relative">
                    {/* Connector Line */}
                    {index < clientStages.length - 1 && (
                      <div 
                        className={`absolute left-6 top-16 w-0.5 h-full -mb-6 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        style={{ height: 'calc(100% - 3rem)' }}
                      />
                    )}

                    {/* Stage Card */}
                    <div 
                      className={`relative border-2 rounded-lg p-6 transition-all ${
                        isCurrent 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : isCompleted
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white opacity-60'
                      }`}
                    >
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isCurrent
                            ? 'bg-blue-500 ring-4 ring-blue-200'
                            : isCompleted
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          {isCompleted || isCurrent ? (
                            <CheckCircle2 className="h-6 w-6 text-white" />
                          ) : (
                            <Clock className="h-6 w-6 text-white" />
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-bold text-lg ${isCurrent ? 'text-blue-900' : 'text-gray-900'}`}>
                              {stage.title}
                            </h3>
                            {isCurrent && (
                              <Badge className="bg-blue-500 text-white">Active</Badge>
                            )}
                            {isCompleted && (
                              <Badge className="bg-green-500 text-white">Completed</Badge>
                            )}
                            {isFuture && (
                              <Badge variant="outline" className="text-gray-500">Upcoming</Badge>
                            )}
                          </div>
                          <p className="text-gray-600">{stage.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div className="flex items-start">
                  <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="text-sm text-gray-900">{clientData?.first_name} {clientData?.last_name}</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900">{clientData?.email}</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900">{clientData?.phone}</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="text-sm text-gray-900">{clientData?.date_of_birth}</dd>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="text-sm text-gray-900">
                      {clientData?.address}<br />
                      {clientData?.city}, {clientData?.state} {clientData?.zip_code}
                    </dd>
                  </div>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Submitted Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Submitted Documents
              </CardTitle>
            </CardHeader>
            <CardContent>
              {clientData?.documents_info && Object.keys(clientData.documents_info).length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(clientData.documents_info).map(([type, info]) => (
                    <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                      <div className="flex items-center">
                        <FileText className="h-6 w-6 text-blue-500 mr-3" />
                        <div>
                          <p className="font-medium text-sm capitalize">
                            {type.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-gray-500">{info.filename}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Uploaded: {formatDate(info.uploaded_at)}
                          </p>
                        </div>
                      </div>
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No documents uploaded yet</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Application Date */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-500">Application Submitted</p>
                  <p className="text-sm text-gray-900">{formatDate(clientData?.created_at)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-500">Last Updated</p>
                <p className="text-sm text-gray-900">{formatDate(clientData?.updated_at)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Our support team is here to help you with any questions about your service.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 mr-2 text-blue-600" />
                <span>support@cras.com</span>
              </div>
              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 mr-2 text-blue-600" />
                <span>+1 (800) 123-4567</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClientDashboard;
