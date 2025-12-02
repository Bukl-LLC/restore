import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, ArrowLeft } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: t(language, 'common.error'),
        description: t(language, 'register.errors.passwordMismatch'),
        variant: 'destructive',
      });
      return;
    }

    if (formData.password.length < 8) {
      toast({
        title: t(language, 'common.error'),
        description: t(language, 'register.errors.passwordShort'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      sessionStorage.setItem('registrationData', JSON.stringify({
        email: formData.email,
        password: formData.password,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
      }));

      toast({
        title: t(language, 'common.success'),
        description: t(language, 'register.success'),
      });

      navigate('/application');
    } catch (error) {
      toast({
        title: t(language, 'common.error'),
        description: error.response?.data?.detail || 'Registration failed',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="absolute top-4 right-4">
        <LanguageSwitcher />
      </div>
      
      <div className="max-w-md mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t(language, 'register.backHome')}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t(language, 'register.title')}</h1>
          <p className="text-gray-600">{t(language, 'register.subtitle')}</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t(language, 'register.form.title')}</CardTitle>
            <CardDescription>{t(language, 'register.form.subtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">{t(language, 'register.form.firstName')} *</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">{t(language, 'register.form.lastName')} *</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">{t(language, 'register.form.email')} *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone">{t(language, 'register.form.phone')} *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">{t(language, 'register.form.password')} *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={t(language, 'register.form.passwordPlaceholder')}
                  required
                />
              </div>

              <div>
                <Label htmlFor="confirmPassword">{t(language, 'register.form.confirmPassword')} *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder={t(language, 'register.form.confirmPasswordPlaceholder')}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t(language, 'register.form.submitting')}
                  </>
                ) : (
                  t(language, 'register.form.submit')
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            {t(language, 'register.alreadyHave')}{' '}
            <a href="/login" className="text-blue-600 hover:underline">{t(language, 'register.loginLink')}</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
