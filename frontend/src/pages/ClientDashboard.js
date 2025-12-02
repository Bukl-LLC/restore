import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { clientAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Clock, FileText, LogOut, User } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Pending Review', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  documents_verified: { label: 'Documents Verified', color: 'bg-blue-100 text-blue-800', icon: CheckCircle2 },
  freeze_completed: { label: 'Freeze Completed', color: 'bg-purple-100 text-purple-800', icon: CheckCircle2 },
  letters_sent: { label: 'Letters Sent', color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle2 },
  ftc_created: { label: 'FTC Report Created', color: 'bg-pink-100 text-pink-800', icon: CheckCircle2 },
  cfpb_filed: { label: 'CFPB Complaint Filed', color: 'bg-orange-100 text-orange-800', icon: CheckCircle2 },
  result_received: { label: 'Result Received', color: 'bg-green-100 text-green-800', icon: CheckCircle2 },
  completed: { label: 'Completed', color: 'bg-green-600 text-white', icon: CheckCircle2 },
};

const stages = [
  { key: 'pending', label: 'Application Submitted' },
  { key: 'documents_verified', label: 'Documents Verified' },
  { key: 'freeze_completed', label: 'Credit Freeze' },
  { key: 'letters_sent', label: 'Letters to Bureaus' },
  { key: 'ftc_created', label: 'FTC Report' },
  { key: 'cfpb_filed', label: 'CFPB Complaint' },
  { key: 'result_received', label: 'Results' },
  { key: 'completed', label: 'Case Completed' },
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

  const getCurrentStageIndex = () => {
    if (!clientData) return 0;
    return stages.findIndex(stage => stage.key === clientData.case_status);
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
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const currentStageIndex = getCurrentStageIndex();
  const config = statusConfig[clientData?.case_status] || statusConfig.pending;

  return (
    <div className="min-h-screen bg-gray-50" data-testid="client-dashboard">
      {/* Header */}
      <header className="bg-white shadow">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Current Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Status</CardTitle>
                <CardDescription>Your case is currently being processed</CardDescription>
              </div>
              <Badge className={config.color}>{config.label}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress Timeline */}
              <div className="relative">
                <div className="flex justify-between items-center">
                  {stages.map((stage, index) => {
                    const isCompleted = index <= currentStageIndex;
                    const isCurrent = index === currentStageIndex;
                    
                    return (
                      <div key={stage.key} className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                          } ${isCurrent ? 'ring-4 ring-green-200' : ''}`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5" />
                          ) : (
                            <Clock className="h-5 w-5" />
                          )}
                        </div>
                        <p className={`text-xs mt-2 text-center ${
                          isCompleted ? 'text-gray-900 font-semibold' : 'text-gray-500'
                        }`}>
                          {stage.label}
                        </p>
                        {index < stages.length - 1 && (
                          <div
                            className={`absolute top-5 h-0.5 ${
                              index < currentStageIndex ? 'bg-green-500' : 'bg-gray-300'
                            }`}
                            style={{
                              left: `${(index / (stages.length - 1)) * 100 + 6.25}%`,
                              width: `${100 / (stages.length - 1) - 12.5}%`,
                            }}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
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
                <div>
                  <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                  <dd className="text-sm text-gray-900">
                    {clientData?.first_name} {clientData?.last_name}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email</dt>
                  <dd className="text-sm text-gray-900">{clientData?.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{clientData?.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                  <dd className="text-sm text-gray-900">{clientData?.date_of_birth}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">
                    {clientData?.address}<br />
                    {clientData?.city}, {clientData?.state} {clientData?.zip_code}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          {/* Documents & History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Case History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientData?.status_history?.map((entry, index) => (
                  <div key={index} className="border-l-2 border-blue-500 pl-4 pb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {statusConfig[entry.status]?.label || entry.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(entry.timestamp)}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mt-1">{entry.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents */}
        {clientData?.documents_info && Object.keys(clientData.documents_info).length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Uploaded Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(clientData.documents_info).map(([type, info]) => (
                  <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div>
                      <p className="font-medium text-sm capitalize">
                        {type.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-gray-500">{info.filename}</p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(info.uploaded_at)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default ClientDashboard;
