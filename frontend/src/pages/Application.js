import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientAPI } from '../services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    ssn: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    agreed_to_terms: false,
  });
  const [files, setFiles] = useState({
    driver_license: null,
    billing_address_proof: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles(prev => ({
      ...prev,
      [name]: selectedFiles[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.agreed_to_terms) {
      toast({
        title: 'Error',
        description: 'You must agree to the terms and conditions',
        variant: 'destructive',
      });
      return;
    }

    if (!files.driver_license || !files.billing_address_proof) {
      toast({
        title: 'Error',
        description: 'Please upload all required documents',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const submitData = new FormData();
      Object.keys(formData).forEach(key => {
        submitData.append(key, formData[key]);
      });
      submitData.append('driver_license', files.driver_license);
      submitData.append('billing_address_proof', files.billing_address_proof);

      const response = await clientAPI.submit(submitData);
      
      toast({
        title: 'Success!',
        description: 'Your application has been submitted successfully',
      });

      // Navigate to success page with credentials
      navigate('/success', { 
        state: { 
          email: response.data.email,
          password: response.data.password,
          clientId: response.data.client_id
        }
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.detail || 'Failed to submit application',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Credit Repair Automation System</h1>
          <p className="text-lg text-gray-600">Submit your application to start the credit repair process</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Client Application Form</CardTitle>
            <CardDescription>Please fill in all required information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name *</Label>
                    <Input
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name *</Label>
                    <Input
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1234567890"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                    <Input
                      id="date_of_birth"
                      name="date_of_birth"
                      type="date"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="ssn">SSN (XXX-XX-XXXX) *</Label>
                    <Input
                      id="ssn"
                      name="ssn"
                      placeholder="123-45-6789"
                      value={formData.ssn}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State *</Label>
                      <Input
                        id="state"
                        name="state"
                        placeholder="CA"
                        maxLength={2}
                        value={formData.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip_code">ZIP Code *</Label>
                      <Input
                        id="zip_code"
                        name="zip_code"
                        placeholder="12345"
                        value={formData.zip_code}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="driver_license">Driver License *</Label>
                    <Input
                      id="driver_license"
                      name="driver_license"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="billing_address_proof">Billing Address Proof *</Label>
                    <Input
                      id="billing_address_proof"
                      name="billing_address_proof"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be dated within last 3 months</p>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreed_to_terms"
                  checked={formData.agreed_to_terms}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, agreed_to_terms: checked }))
                  }
                />
                <Label htmlFor="agreed_to_terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the terms and conditions and authorize the credit repair process
                </Label>
              </div>

              <Button type="submit" className="w-full" disabled={loading} data-testid="submit-application-btn">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-600 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
