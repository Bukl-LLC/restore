import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Shield, Clock, FileText, TrendingUp, Users } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Shield,
      title: 'Полная конфиденциальность',
      description: 'Ваши данные защищены на всех этапах процесса'
    },
    {
      icon: Clock,
      title: 'Быстрый процесс',
      description: 'Результаты через 60-90 дней с автоматическим отслеживанием'
    },
    {
      icon: FileText,
      title: 'Все документы',
      description: 'Подготовка всех необходимых документов и отчетов'
    },
    {
      icon: TrendingUp,
      title: 'Улучшение кредита',
      description: 'Эффективные методы восстановления кредитной истории'
    },
    {
      icon: Users,
      title: 'Экспертная поддержка',
      description: 'Команда специалистов контролирует каждый этап'
    },
    {
      icon: CheckCircle,
      title: 'Гарантия результата',
      description: 'Работаем до достижения положительного результата'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Регистрация',
      description: 'Создайте аккаунт и заполните форму заявки'
    },
    {
      number: '02',
      title: 'Проверка документов',
      description: 'Наши специалисты проверяют ваши документы'
    },
    {
      number: '03',
      title: 'Credit Freeze',
      description: 'Замораживаем кредитные отчеты в бюро'
    },
    {
      number: '04',
      title: 'Отправка писем',
      description: 'Отправляем запросы в кредитные бюро'
    },
    {
      number: '05',
      title: 'FTC & CFPB',
      description: 'Создаем отчеты и подаем жалобы'
    },
    {
      number: '06',
      title: 'Результат',
      description: 'Получаем положительные изменения в вашей кредитной истории'
    }
  ];

  const stats = [
    { value: '95%', label: 'Успешных кейсов' },
    { value: '60-90', label: 'Дней до результата' },
    { value: '1000+', label: 'Довольных клиентов' },
    { value: '24/7', label: 'Поддержка клиентов' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Восстановление кредитной истории
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Автоматизированная система для эффективного восстановления вашего кредита
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                onClick={() => navigate('/register')}
                data-testid="get-started-btn"
              >
                Начать сейчас
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate('/login')}
              >
                Войти
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
              Почему выбирают нас
            </h2>
            <p className="text-xl text-gray-600">
              Профессиональный подход к восстановлению вашего кредита
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
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
              Как это работает
            </h2>
            <p className="text-xl text-gray-600">
              Простой и прозрачный процесс восстановления кредита
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="text-5xl font-bold text-blue-100 mb-4">
                    {step.number}
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
                Что включает наш сервис
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Анализ кредитной истории</h3>
                    <p className="text-gray-600">Детальный разбор всех записей в ваших кредитных отчетах</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Работа с кредитными бюро</h3>
                    <p className="text-gray-600">Отправка запросов в Experian, Equifax, TransUnion</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">FTC Report и CFPB жалобы</h3>
                    <p className="text-gray-600">Официальные обращения в федеральные органы</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефонные диспуты</h3>
                    <p className="text-gray-600">При необходимости проводим телефонные переговоры</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Личный кабинет</h3>
                    <p className="text-gray-600">Отслеживайте прогресс в режиме реального времени</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Начните восстановление кредита уже сегодня
              </h3>
              <p className="text-gray-600 mb-6">
                Зарегистрируйтесь и заполните форму заявки. Наши специалисты начнут работу 
                над вашим делом в течение 24 часов.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Без скрытых платежей
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Полная прозрачность процесса
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Поддержка на каждом этапе
                </li>
              </ul>
              <Button
                size="lg"
                className="w-full text-lg py-6"
                onClick={() => navigate('/register')}
              >
                Зарегистрироваться сейчас
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Готовы улучшить свой кредит?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Присоединяйтесь к тысячам довольных клиентов, которые восстановили свою кредитную историю
          </p>
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            onClick={() => navigate('/register')}
          >
            Начать бесплатную консультацию
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
                Профессиональное восстановление кредитной истории с использованием 
                передовых технологий автоматизации.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="hover:text-white">Главная</a></li>
                <li><a href="/register" className="hover:text-white">Регистрация</a></li>
                <li><a href="/login" className="hover:text-white">Вход</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Контакты</h4>
              <p className="text-sm">
                Email: support@cras.com<br />
                Телефон: +1 (800) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; 2025 Credit Repair Automation System. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
