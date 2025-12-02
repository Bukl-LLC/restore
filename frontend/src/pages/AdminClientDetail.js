import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, FileText, CheckCircle, Clock } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const statusOptions = [
  { value: 'pending', label: 'Pending Review' },
  { value: 'documents_verified', label: 'Documents Verified' },
  { value: 'freeze_completed', label: 'Freeze Completed' },
  { value: 'letters_sent', label: 'Letters Sent' },
  { value: 'ftc_created', label: 'FTC Report Created' },
  { value: 'cfpb_filed', label: 'CFPB Complaint Filed' },
  { value: 'result_received', label: 'Result Received' },
  { value: 'completed', label: 'Completed' },
];

const statusConfig = {
  pending: { color: 'bg-yellow-100 text-yellow-800' },
  documents_verified: { color: 'bg-blue-100 text-blue-800' },
  freeze_completed: { color: 'bg-purple-100 text-purple-800' },
  letters_sent: { color: 'bg-indigo-100 text-indigo-800' },
  ftc_created: { color: 'bg-pink-100 text-pink-800' },
  cfpb_filed: { color: 'bg-orange-100 text-orange-800' },
  result_received: { color: 'bg-green-100 text-green-800' },
  completed: { color: 'bg-green-600 text-white' },
};

const AdminClientDetail = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    loadClient();
  }, [clientId]);

  const loadClient = async () => {
    try {
      const response = await adminAPI.getClientDetail(clientId);
      setClient(response.data);
      setNewStatus(response.data.case_status);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load client details',
        variant: 'destructive',
      });
      navigate('/admin/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    if (newStatus === client.case_status && !notes) {
      toast({
        title: 'No Changes',
        description: 'No status or notes to update',
        variant: 'destructive',
      });
      return;
    }

    setUpdating(true);
    try {
      await adminAPI.updateClientStatus(clientId, newStatus, notes);
      toast({
        title: 'Success',
        description: 'Client status updated successfully',
      });
      setNotes('');
      await loadClient();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading client details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" data-testid="admin-client-detail">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin/dashboard')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {client.first_name} {client.last_name}
                </h1>
                <p className="text-sm text-gray-600 mt-1">{client.email}</p>
              </div>
            </div>
            <Badge className={statusConfig[client.case_status]?.color}>
              {statusOptions.find(s => s.value === client.case_status)?.label}
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Client Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {client.first_name} {client.last_name}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="text-sm text-gray-900 mt-1">{client.email}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="text-sm text-gray-900 mt-1">{client.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                    <dd className="text-sm text-gray-900 mt-1">{client.date_of_birth}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">SSN</dt>
                    <dd className="text-sm text-gray-900 mt-1">{client.ssn}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Case ID</dt>
                    <dd className="text-sm text-gray-900 mt-1 font-mono">{client.id}</dd>
                  </div>
                  <div className="md:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                    <dd className="text-sm text-gray-900 mt-1">
                      {client.address}<br />
                      {client.city}, {client.state} {client.zip_code}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>

            {/* Documents */}
            {client.documents_info && Object.keys(client.documents_info).length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Uploaded Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(client.documents_info).map(([type, info]) => (
                      <div key={type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm capitalize">
                            {type.replace('_', ' ')}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{info.filename}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            Size: {(info.size / 1024).toFixed(2)} KB
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Uploaded: {formatDate(info.uploaded_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Case History */}
            <Card>
              <CardHeader>
                <CardTitle>Case History</CardTitle>
                <CardDescription>Timeline of all case activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {client.status_history?.map((entry, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className={`${statusConfig[entry.status]?.color} mb-2`}>
                            {statusOptions.find(s => s.value === entry.status)?.label}
                          </Badge>
                          {entry.notes && (
                            <p className="text-sm text-gray-600 mt-2">{entry.notes}</p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status Management */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Update Status</CardTitle>
                <CardDescription>Change the client's case status</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="status">New Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add notes about this status change..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleUpdateStatus}
                  disabled={updating}
                  data-testid="update-status-btn"
                >
                  {updating ? 'Updating...' : 'Update Status'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Case Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-500">Created</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(client.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Updated</p>
                  <p className="text-sm text-gray-900 mt-1">{formatDate(client.updated_at)}</p>
                </div>
                {client.notes && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Admin Notes</p>
                    <p className="text-sm text-gray-900 mt-1">{client.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminClientDetail;
