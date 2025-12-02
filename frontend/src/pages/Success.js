import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { email, password, clientId } = location.state || {};

  React.useEffect(() => {
    if (!email || !password) {
      navigate('/');
    }
  }, [email, password, navigate]);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 py-12 px-4 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl">Application Submitted Successfully!</CardTitle>
            <CardDescription className="text-lg">
              Your credit repair journey has begun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg text-blue-900">Your Login Credentials</h3>
              <p className="text-sm text-blue-800">
                Please save these credentials to access your client portal and track your case progress.
              </p>
              
              <div className="space-y-3">
                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-mono font-semibold">{email}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(email, 'Email')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-white p-4 rounded border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Password</p>
                      <p className="font-mono font-semibold">{password}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(password, 'Password')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>Important:</strong> Please save these credentials now. For security reasons, 
                  we won't be able to show them again.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Your application is being reviewed by our team</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>You can track your case progress in the client portal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>We'll send you email updates at each stage of the process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>The entire process typically takes 60-90 days</span>
                </li>
              </ul>
            </div>

            <Button
              className="w-full"
              onClick={() => navigate('/login')}
              data-testid="goto-login-btn"
            >
              Go to Client Portal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Success;
