import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../translations';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, FileText, TrendingUp, Users } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const featureIcons = [Shield, Clock, FileText, TrendingUp, Users, CheckCircle];

  const stats = [
    { value: '95%', label: t(language, 'landing.stats.successRate') },
    { value: '60-90', label: t(language, 'landing.stats.timeToResult') },
    { value: '1000+', label: t(language, 'landing.stats.happyClients') },
    { value: '24/7', label: t(language, 'landing.stats.support') }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20 relative">
        {/* Language Switcher */}
        <div className="absolute top-4 right-4">
          <LanguageSwitcher variant="outline" className="border-white text-white hover:bg-white/10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {t(language, 'landing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {t(language, 'landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                onClick={() => navigate('/register')}
                data-testid="get-started-btn"
              >
                {t(language, 'landing.hero.getStarted')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate('/login')}
              >
                {t(language, 'landing.hero.login')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t(language, 'landing.features.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(language, 'landing.features.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t(language, 'landing.features.items').map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <Card key={index} className="border-2 hover:border-blue-500 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t(language, 'landing.process.title')}
            </h2>
            <p className="text-xl text-gray-600">
              {t(language, 'landing.process.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t(language, 'landing.process.steps').map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-5xl font-bold text-blue-100 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t(language, 'landing.services.title')}
              </h2>
              <div className="space-y-4">
                {t(language, 'landing.services.items').map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t(language, 'landing.services.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {language === 'en' 
                  ? 'Register and fill out the application form. Our specialists will start working on your case within 24 hours.'
                  : 'Зарегистрируйтесь и заполните форму заявки. Наши специалисты начнут работу над вашим делом в течение 24 часов.'
                }
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {language === 'en' ? 'No hidden fees' : 'Без скрытых платежей'}
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {language === 'en' ? 'Full process transparency' : 'Полная прозрачность процесса'}
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  {language === 'en' ? 'Support at every stage' : 'Поддержка на каждом этапе'}
                </li>
              </ul>
              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={() => navigate('/register')}
              >
                {language === 'en' ? 'Register Now' : 'Зарегистрироваться сейчас'}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            {t(language, 'landing.cta.title')}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t(language, 'landing.cta.subtitle')}
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            onClick={() => navigate('/register')}
          >
            {t(language, 'landing.cta.button')}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Credit Repair Automation System</h3>
              <p className="text-sm">
                {t(language, 'landing.footer.description')}
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t(language, 'landing.footer.navigation')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">{t(language, 'landing.footer.home')}</a></li>
                <li><a href="/register" className="hover:text-white">{t(language, 'landing.footer.register')}</a></li>
                <li><a href="/login" className="hover:text-white">{t(language, 'landing.footer.login')}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">{t(language, 'landing.footer.contacts')}</h4>
              <p className="text-sm">
                Email: support@cras.com<br />
                {language === 'en' ? 'Phone' : 'Телефон'}: +1 (800) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Credit Repair Automation System. {t(language, 'landing.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
