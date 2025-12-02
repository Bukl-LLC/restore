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
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const statusConfig = {
  pending: { 
    label: 'Pending Review', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    icon: Clock,
    progress: 12.5
  },
  documents_verified: { 
    label: 'Documents Verified', 
    color: 'bg-blue-100 text-blue-800 border-blue-300',
    icon: CheckCircle2,
    progress: 25
  },
  freeze_completed: { 
    label: 'Freeze Completed', 
    color: 'bg-purple-100 text-purple-800 border-purple-300',
    icon: CheckCircle2,
    progress: 37.5
  },
  letters_sent: { 
    label: 'Letters Sent', 
    color: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    icon: CheckCircle2,
    progress: 50
  },
  ftc_created: { 
    label: 'FTC Report Created', 
    color: 'bg-pink-100 text-pink-800 border-pink-300',
    icon: CheckCircle2,
    progress: 62.5
  },
  cfpb_filed: { 
    label: 'CFPB Complaint Filed', 
    color: 'bg-orange-100 text-orange-800 border-orange-300',
    icon: CheckCircle2,
    progress: 75
  },
  result_received: { 
    label: 'Result Received', 
    color: 'bg-green-100 text-green-800 border-green-300',
    icon: CheckCircle2,
    progress: 87.5
  },
  completed: { 
    label: 'Completed', 
    color: 'bg-green-600 text-white border-green-700',
    icon: CheckCircle2,
    progress: 100
  },
};

const detailedStages = [
  {
    key: 'pending',
    title: 'Application Received',
    shortTitle: 'Received',
    description: 'Your application has been submitted and is under review by our team.',
    details: [
      'Application form received',
      'Documents uploaded successfully',
      'Initial review in progress'
    ],
    estimatedTime: 'Within 24 hours',
    whatHappens: 'Our specialists are reviewing your application and verifying all submitted information and documents.'
  },
  {
    key: 'documents_verified',
    title: 'Documents Verified',
    shortTitle: 'Verified',
    description: 'All your documents have been verified and approved.',
    details: [
      'SSN verified',
      'Driver License validated',
      'Billing address confirmed',
      'Identity verification complete'
    ],
    estimatedTime: '1-2 business days',
    whatHappens: 'We verify your identity documents, confirm your SSN, and validate your billing address proof to ensure accuracy.'
  },
  {
    key: 'freeze_completed',
    title: 'Credit Freeze Initiated',
    shortTitle: 'Credit Freeze',
    description: 'Credit freeze has been completed with LexisNexis and Innovis.',
    details: [
      'LexisNexis freeze placed',
      'Innovis freeze placed',
      'Confirmation numbers saved',
      'Freeze documentation archived'
    ],
    estimatedTime: '2-3 business days',
    whatHappens: 'We place security freezes on your credit reports at LexisNexis and Innovis to protect your information during the dispute process.'
  },
  {
    key: 'letters_sent',
    title: 'Dispute Letters Sent',
    shortTitle: 'Letters Sent',
    description: 'Certified letters sent to all three major credit bureaus.',
    details: [
      'Letter to Experian sent',
      'Letter to Equifax sent',
      'Letter to TransUnion sent',
      'Tracking numbers recorded',
      'Delivery confirmation pending'
    ],
    estimatedTime: '1 week for delivery',
    whatHappens: 'We send certified dispute letters with your personal information correction requests to Experian, Equifax, and TransUnion. Bureaus have 30 days to respond.'
  },
  {
    key: 'ftc_created',
    title: 'FTC Report Filed',
    shortTitle: 'FTC Report',
    description: 'Identity theft report created and filed with the FTC.',
    details: [
      'FTC account created',
      'Identity theft report submitted',
      'FTC report number obtained',
      'Report PDF archived',
      'Waiting period: 14 days'
    ],
    estimatedTime: '14 days waiting period',
    whatHappens: 'After waiting 14 days from letter submission, we create an official FTC identity theft report on IdentityTheft.gov to support your case.'
  },
  {
    key: 'cfpb_filed',
    title: 'CFPB Complaint Submitted',
    shortTitle: 'CFPB Filed',
    description: 'Official complaint filed with Consumer Financial Protection Bureau.',
    details: [
      'CFPB account created',
      'Complaint form completed',
      'Supporting documents attached',
      'Complaint number assigned',
      'Bureaus notified (30-day response time)'
    ],
    estimatedTime: '30 days for bureau response',
    whatHappens: 'We file an official complaint with the CFPB against credit bureaus that haven\'t resolved your disputes. They must respond within 30 days.'
  },
  {
    key: 'result_received',
    title: 'Results & Phone Disputes',
    shortTitle: 'Results',
    description: 'Reviewing bureau responses and conducting phone disputes if needed.',
    details: [
      'CFPB responses received',
      'Results analyzed',
      'Phone disputes initiated (if needed)',
      'Additional follow-ups in progress',
      'Final verification pending'
    ],
    estimatedTime: '30 days',
    whatHappens: 'We review all responses from credit bureaus. If items weren\'t removed, we conduct phone disputes and escalate through additional channels.'
  },
  {
    key: 'completed',
    title: 'Case Completed',
    shortTitle: 'Completed',
    description: 'Your credit repair case has been successfully completed!',
    details: [
      'All disputes resolved',
      'Credit reports updated',
      'Final report generated',
      'Case documentation archived',
      'Success notification sent'
    ],
    estimatedTime: 'Completed',
    whatHappens: 'Your case is complete! Negative items have been successfully disputed and removed from your credit reports. You can now enjoy improved credit.'
  }
];

const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedStage, setExpandedStage] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await clientAPI.getDashboard();
      setClientData(response.data);
      // Auto-expand current stage
      setExpandedStage(response.data.case_status);
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

  const getCurrentStageIndex = () => {
    if (!clientData) return 0;
    return detailedStages.findIndex(stage => stage.key === clientData.case_status);
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your case details...</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = getCurrentStageIndex();
  const config = statusConfig[clientData?.case_status] || statusConfig.pending;
  const currentStage = detailedStages[currentStageIndex];
  const nextStage = detailedStages[currentStageIndex + 1];

  return (
    <div className="min-h-screen bg-gray-50" data-testid="client-dashboard">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Client Portal</h1>
              <p className="text-sm text-gray-600 mt-1">
                Welcome back, {clientData?.first_name} {clientData?.last_name}
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
        {/* Current Status Overview */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Current Status: {config.label}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {currentStage.description}
                </CardDescription>
              </div>
              <Badge className={`${config.color} text-lg px-4 py-2 border-2`}>
                {config.label}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-blue-600">{config.progress}%</span>
                </div>
                <Progress value={config.progress} className="h-3" />
                <p className="text-xs text-gray-500 mt-2">
                  Step {currentStageIndex + 1} of {detailedStages.length}
                </p>
              </div>

              {/* What's Happening Now */}
              <div className="bg-white rounded-lg p-6 border-2 border-blue-100">
                <h3 className="font-semibold text-lg mb-3 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-blue-600" />
                  What's Happening Now
                </h3>
                <p className="text-gray-700 mb-4">{currentStage.whatHappens}</p>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-600">Current Activities:</p>
                  <ul className="space-y-1">
                    {currentStage.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                  <p className="text-sm">
                    <span className="font-semibold">Estimated Time:</span> {currentStage.estimatedTime}
                  </p>
                </div>
              </div>

              {/* Next Step Preview */}
              {nextStage && (
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h3 className="font-semibold text-sm text-gray-600 mb-2 flex items-center">
                    <ArrowRight className="h-4 w-4 mr-2" />
                    Next Step: {nextStage.title}
                  </h3>
                  <p className="text-sm text-gray-600">{nextStage.description}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Detailed Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Complete Case Timeline</CardTitle>
            <CardDescription>Track every step of your credit repair journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {detailedStages.map((stage, index) => {
                const isCompleted = index < currentStageIndex;
                const isCurrent = index === currentStageIndex;
                const isFuture = index > currentStageIndex;
                const StageIcon = statusConfig[stage.key]?.icon || Clock;
                const isExpanded = expandedStage === stage.key;

                return (
                  <div key={stage.key} className="relative">
                    {/* Connector Line */}
                    {index < detailedStages.length - 1 && (
                      <div 
                        className={`absolute left-6 top-14 w-0.5 h-full ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    )}

                    {/* Stage Card */}
                    <div 
                      className={`relative border-2 rounded-lg p-4 transition-all cursor-pointer ${
                        isCurrent 
                          ? 'border-blue-500 bg-blue-50 shadow-lg' 
                          : isCompleted
                          ? 'border-green-300 bg-green-50'
                          : 'border-gray-200 bg-white'
                      } ${isExpanded ? 'shadow-xl' : ''}`}
                      onClick={() => setExpandedStage(isExpanded ? null : stage.key)}
                    >
                      <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          isCurrent
                            ? 'bg-blue-500 ring-4 ring-blue-200'
                            : isCompleted
                            ? 'bg-green-500'
                            : 'bg-gray-300'
                        }`}>
                          <StageIcon className="h-6 w-6 text-white" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className={`font-bold ${isCurrent ? 'text-blue-900 text-lg' : 'text-gray-900'}`}>
                                {stage.title}
                              </h3>
                              {isCurrent && (
                                <Badge className="mt-1 bg-blue-500">Current Step</Badge>
                              )}
                              {isCompleted && (
                                <Badge className="mt-1 bg-green-500">Completed</Badge>
                              )}
                              {isFuture && (
                                <Badge variant="outline" className="mt-1">Upcoming</Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500">{stage.estimatedTime}</span>
                          </div>

                          <p className="text-sm text-gray-600 mb-3">{stage.description}</p>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="mt-4 space-y-4 border-t pt-4">
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Process Details:</p>
                                <p className="text-sm text-gray-600 mb-3">{stage.whatHappens}</p>
                              </div>

                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">Activities:</p>
                                <ul className="space-y-1">
                                  {stage.details.map((detail, idx) => (
                                    <li key={idx} className="flex items-start text-sm text-gray-600">
                                      <CheckCircle2 className={`h-4 w-4 mr-2 flex-shrink-0 mt-0.5 ${
                                        isCompleted || (isCurrent && idx < 2) ? 'text-green-500' : 'text-gray-400'
                                      }`} />
                                      {detail}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}
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
              <dl className="space-y-3">
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

          {/* Case History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Status Change History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData?.status_history?.slice().reverse().map((entry, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
                    <div className="flex items-center justify-between mb-1">
                      <Badge className={statusConfig[entry.status]?.color || 'bg-gray-100'}>
                        {statusConfig[entry.status]?.label || entry.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Uploaded Documents */}
        {clientData?.documents_info && Object.keys(clientData.documents_info).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Your Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(clientData.documents_info).map(([type, info]) => (
                  <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-500 mr-3" />
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
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-2">Need Help?</h3>
            <p className="text-sm text-gray-700 mb-4">
              Our support team is here to help you with any questions about your case.
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
