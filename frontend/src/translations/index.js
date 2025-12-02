export const translations = {
  en: {
    // Landing Page
    landing: {
      hero: {
        title: 'Credit History Restoration',
        subtitle: 'Automated system for effective credit repair',
        getStarted: 'Get Started',
        login: 'Login'
      },
      stats: {
        successRate: 'Successful cases',
        timeToResult: 'Days to result',
        happyClients: 'Happy clients',
        support: 'Customer support'
      },
      features: {
        title: 'Why Choose Us',
        subtitle: 'Professional approach to restoring your credit',
        items: [
          {
            title: 'Complete Confidentiality',
            description: 'Your data is protected at all stages of the process'
          },
          {
            title: 'Fast Process',
            description: 'Results within 60-90 days with automatic tracking'
          },
          {
            title: 'All Documents',
            description: 'Preparation of all necessary documents and reports'
          },
          {
            title: 'Credit Improvement',
            description: 'Effective methods for credit history restoration'
          },
          {
            title: 'Expert Support',
            description: 'Team of specialists monitors every stage'
          },
          {
            title: 'Result Guarantee',
            description: 'We work until achieving positive results'
          }
        ]
      },
      process: {
        title: 'How It Works',
        subtitle: 'Simple and transparent credit restoration process',
        steps: [
          { title: 'Registration', description: 'Create an account and fill out the application form' },
          { title: 'Document Verification', description: 'Our specialists verify your documents' },
          { title: 'Credit Freeze', description: 'We freeze credit reports at bureaus' },
          { title: 'Sending Letters', description: 'We send requests to credit bureaus' },
          { title: 'FTC & CFPB', description: 'We create reports and file complaints' },
          { title: 'Result', description: 'Get positive changes in your credit history' }
        ]
      },
      services: {
        title: 'What Our Service Includes',
        items: [
          { title: 'Credit History Analysis', description: 'Detailed breakdown of all records in your credit reports' },
          { title: 'Work with Credit Bureaus', description: 'Sending requests to Experian, Equifax, TransUnion' },
          { title: 'FTC Report and CFPB Complaints', description: 'Official appeals to federal agencies' },
          { title: 'Phone Disputes', description: 'If necessary, we conduct phone negotiations' },
          { title: 'Personal Account', description: 'Track progress in real-time' }
        ]
      },
      cta: {
        title: 'Ready to Improve Your Credit?',
        subtitle: 'Join thousands of satisfied clients who restored their credit history',
        button: 'Start Free Consultation'
      },
      footer: {
        description: 'Professional credit history restoration using cutting-edge automation technologies.',
        navigation: 'Navigation',
        home: 'Home',
        register: 'Register',
        login: 'Login',
        contacts: 'Contacts',
        copyright: 'All rights reserved.'
      }
    },
    // Register Page
    register: {
      title: 'Registration',
      subtitle: 'Create an account to submit application',
      backHome: 'Back to Home',
      form: {
        title: 'Create Account',
        subtitle: 'Enter your data for registration',
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        password: 'Password',
        confirmPassword: 'Confirm Password',
        passwordPlaceholder: 'Minimum 8 characters',
        confirmPasswordPlaceholder: 'Repeat password',
        submit: 'Register',
        submitting: 'Registering...'
      },
      alreadyHave: 'Already have an account?',
      loginLink: 'Login',
      errors: {
        passwordMismatch: 'Passwords do not match',
        passwordShort: 'Password must contain at least 8 characters'
      },
      success: 'Registration successful. Fill out the application form.'
    },
    // Application Form
    application: {
      title: 'Credit Repair Automation System',
      subtitle: 'Submit your application to start the credit repair process',
      formTitle: 'Client Application Form',
      formSubtitle: 'Please fill in all required information',
      personalInfo: 'Personal Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      dateOfBirth: 'Date of Birth',
      ssn: 'SSN (XXX-XX-XXXX)',
      address: 'Address',
      streetAddress: 'Street Address',
      city: 'City',
      state: 'State',
      zipCode: 'ZIP Code',
      documents: 'Required Documents',
      driverLicense: 'Driver License',
      billingProof: 'Billing Address Proof',
      billingProofNote: 'Must be dated within last 3 months',
      agreeTerms: 'I agree to the terms and conditions and authorize the credit repair process',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      alreadyHave: 'Already have an account?',
      loginHere: 'Login here',
      errors: {
        mustAgree: 'You must agree to the terms and conditions',
        uploadDocs: 'Please upload all required documents'
      }
    },
    // Success Page
    success: {
      title: 'Application Submitted Successfully!',
      subtitle: 'Your credit repair journey has begun',
      credentials: 'Your Login Credentials',
      saveNote: 'Please save these credentials to access your client portal and track your case progress.',
      email: 'Email',
      password: 'Password',
      important: 'Important:',
      importantNote: 'Please save these credentials now. For security reasons, we won\'t be able to show them again.',
      whatsNext: 'What\'s Next?',
      steps: [
        'Your application is being reviewed by our team',
        'You can track your case progress in the client portal',
        'We\'ll send you email updates at each stage of the process',
        'The entire process typically takes 60-90 days'
      ],
      goToPortal: 'Go to Client Portal'
    },
    // Login Page
    login: {
      title: 'Welcome Back',
      subtitle: 'Login to access your account',
      formTitle: 'Login',
      formSubtitle: 'Enter your credentials to continue',
      email: 'Email',
      password: 'Password',
      submit: 'Login',
      submitting: 'Logging in...',
      noAccount: 'Don\'t have an account?',
      submitApp: 'Submit application'
    },
    // Client Dashboard
    clientDashboard: {
      title: 'Client Portal',
      welcome: 'Welcome back',
      logout: 'Logout',
      currentStatus: 'Current Status',
      statusSubtitle: 'Your case is currently being processed',
      timeline: [
        'Application Submitted',
        'Documents Verified',
        'Credit Freeze',
        'Letters to Bureaus',
        'FTC Report',
        'CFPB Complaint',
        'Results',
        'Case Completed'
      ],
      personalInfo: 'Personal Information',
      caseHistory: 'Case History',
      uploadedDocs: 'Uploaded Documents',
      fullName: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      dateOfBirth: 'Date of Birth',
      address: 'Address'
    },
    // Admin Dashboard
    adminDashboard: {
      title: 'Admin Dashboard',
      subtitle: 'Credit Repair Automation System',
      logout: 'Logout',
      stats: {
        totalClients: 'Total Clients',
        pending: 'Pending',
        inProgress: 'In Progress',
        completed: 'Completed'
      },
      allClients: 'All Clients',
      manageClients: 'Manage and monitor client cases',
      search: 'Search clients...',
      filterStatus: 'Filter by status',
      allStatuses: 'All Statuses',
      table: {
        name: 'Name',
        email: 'Email',
        status: 'Status',
        created: 'Created',
        actions: 'Actions',
        viewDetails: 'View Details',
        noClients: 'No clients found'
      }
    },
    // Statuses
    statuses: {
      pending: 'Pending Review',
      documents_verified: 'Documents Verified',
      freeze_completed: 'Freeze Completed',
      letters_sent: 'Letters Sent',
      ftc_created: 'FTC Report Created',
      cfpb_filed: 'CFPB Complaint Filed',
      result_received: 'Result Received',
      completed: 'Completed'
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      success: 'Success'
    }
  },
  ru: {
    // Landing Page
    landing: {
      hero: {
        title: 'Восстановление кредитной истории',
        subtitle: 'Автоматизированная система для эффективного восстановления вашего кредита',
        getStarted: 'Начать сейчас',
        login: 'Войти'
      },
      stats: {
        successRate: 'Успешных кейсов',
        timeToResult: 'Дней до результата',
        happyClients: 'Довольных клиентов',
        support: 'Поддержка клиентов'
      },
      features: {
        title: 'Почему выбирают нас',
        subtitle: 'Профессиональный подход к восстановлению вашего кредита',
        items: [
          {
            title: 'Полная конфиденциальность',
            description: 'Ваши данные защищены на всех этапах процесса'
          },
          {
            title: 'Быстрый процесс',
            description: 'Результаты через 60-90 дней с автоматическим отслеживанием'
          },
          {
            title: 'Все документы',
            description: 'Подготовка всех необходимых документов и отчетов'
          },
          {
            title: 'Улучшение кредита',
            description: 'Эффективные методы восстановления кредитной истории'
          },
          {
            title: 'Экспертная поддержка',
            description: 'Команда специалистов контролирует каждый этап'
          },
          {
            title: 'Гарантия результата',
            description: 'Работаем до достижения положительного результата'
          }
        ]
      },
      process: {
        title: 'Как это работает',
        subtitle: 'Простой и прозрачный процесс восстановления кредита',
        steps: [
          { title: 'Регистрация', description: 'Создайте аккаунт и заполните форму заявки' },
          { title: 'Проверка документов', description: 'Наши специалисты проверяют ваши документы' },
          { title: 'Credit Freeze', description: 'Замораживаем кредитные отчеты в бюро' },
          { title: 'Отправка писем', description: 'Отправляем запросы в кредитные бюро' },
          { title: 'FTC & CFPB', description: 'Создаем отчеты и подаем жалобы' },
          { title: 'Результат', description: 'Получаем положительные изменения в вашей кредитной истории' }
        ]
      },
      services: {
        title: 'Что включает наш сервис',
        items: [
          { title: 'Анализ кредитной истории', description: 'Детальный разбор всех записей в ваших кредитных отчетах' },
          { title: 'Работа с кредитными бюро', description: 'Отправка запросов в Experian, Equifax, TransUnion' },
          { title: 'FTC Report и CFPB жалобы', description: 'Официальные обращения в федеральные органы' },
          { title: 'Телефонные диспуты', description: 'При необходимости проводим телефонные переговоры' },
          { title: 'Личный кабинет', description: 'Отслеживайте прогресс в режиме реального времени' }
        ]
      },
      cta: {
        title: 'Готовы улучшить свой кредит?',
        subtitle: 'Присоединяйтесь к тысячам довольных клиентов, которые восстановили свою кредитную историю',
        button: 'Начать бесплатную консультацию'
      },
      footer: {
        description: 'Профессиональное восстановление кредитной истории с использованием передовых технологий автоматизации.',
        navigation: 'Навигация',
        home: 'Главная',
        register: 'Регистрация',
        login: 'Вход',
        contacts: 'Контакты',
        copyright: 'Все права защищены.'
      }
    },
    // Register Page  
    register: {
      title: 'Регистрация',
      subtitle: 'Создайте аккаунт для подачи заявки',
      backHome: 'На главную',
      form: {
        title: 'Создать аккаунт',
        subtitle: 'Введите ваши данные для регистрации',
        firstName: 'Имя',
        lastName: 'Фамилия',
        email: 'Email',
        phone: 'Телефон',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        passwordPlaceholder: 'Минимум 8 символов',
        confirmPasswordPlaceholder: 'Повторите пароль',
        submit: 'Зарегистрироваться',
        submitting: 'Регистрация...'
      },
      alreadyHave: 'Уже есть аккаунт?',
      loginLink: 'Войти',
      errors: {
        passwordMismatch: 'Пароли не совпадают',
        passwordShort: 'Пароль должен содержать минимум 8 символов'
      },
      success: 'Регистрация прошла успешно. Заполните форму заявки.'
    },
    // Application Form
    application: {
      title: 'Credit Repair Automation System',
      subtitle: 'Отправьте заявку для начала процесса восстановления кредита',
      formTitle: 'Форма заявки клиента',
      formSubtitle: 'Пожалуйста, заполните всю необходимую информацию',
      personalInfo: 'Личная информация',
      firstName: 'Имя',
      lastName: 'Фамилия',
      email: 'Email',
      phone: 'Телефон',
      dateOfBirth: 'Дата рождения',
      ssn: 'SSN (XXX-XX-XXXX)',
      address: 'Адрес',
      streetAddress: 'Улица и дом',
      city: 'Город',
      state: 'Штат',
      zipCode: 'Почтовый индекс',
      documents: 'Необходимые документы',
      driverLicense: 'Водительское удостоверение',
      billingProof: 'Подтверждение адреса',
      billingProofNote: 'Должно быть датировано в пределах последних 3 месяцев',
      agreeTerms: 'Я согласен с условиями и разрешаю процесс восстановления кредита',
      submit: 'Отправить заявку',
      submitting: 'Отправка...',
      alreadyHave: 'Уже есть аккаунт?',
      loginHere: 'Войдите здесь',
      errors: {
        mustAgree: 'Вы должны согласиться с условиями',
        uploadDocs: 'Пожалуйста, загрузите все необходимые документы'
      }
    },
    // Success Page
    success: {
      title: 'Заявка успешно отправлена!',
      subtitle: 'Ваш путь восстановления кредита начался',
      credentials: 'Ваши данные для входа',
      saveNote: 'Пожалуйста, сохраните эти данные для доступа к личному кабинету и отслеживания прогресса.',
      email: 'Email',
      password: 'Пароль',
      important: 'Важно:',
      importantNote: 'Пожалуйста, сохраните эти данные сейчас. По соображениям безопасности мы не сможем показать их снова.',
      whatsNext: 'Что дальше?',
      steps: [
        'Ваша заявка рассматривается нашей командой',
        'Вы можете отслеживать прогресс в личном кабинете',
        'Мы будем отправлять вам обновления на каждом этапе',
        'Весь процесс обычно занимает 60-90 дней'
      ],
      goToPortal: 'Перейти в личный кабинет'
    },
    // Login Page
    login: {
      title: 'Добро пожаловать',
      subtitle: 'Войдите в свой аккаунт',
      formTitle: 'Вход',
      formSubtitle: 'Введите свои данные для продолжения',
      email: 'Email',
      password: 'Пароль',
      submit: 'Войти',
      submitting: 'Вход...',
      noAccount: 'Нет аккаунта?',
      submitApp: 'Подать заявку'
    },
    // Client Dashboard
    clientDashboard: {
      title: 'Личный кабинет',
      welcome: 'Добро пожаловать',
      logout: 'Выход',
      currentStatus: 'Текущий статус',
      statusSubtitle: 'Ваше дело находится в обработке',
      timeline: [
        'Заявка получена',
        'Документы проверены',
        'Credit Freeze',
        'Письма в бюро',
        'FTC отчет',
        'CFPB жалоба',
        'Результаты',
        'Дело закрыто'
      ],
      personalInfo: 'Личная информация',
      caseHistory: 'История дела',
      uploadedDocs: 'Загруженные документы',
      fullName: 'Полное имя',
      email: 'Email',
      phone: 'Телефон',
      dateOfBirth: 'Дата рождения',
      address: 'Адрес'
    },
    // Admin Dashboard
    adminDashboard: {
      title: 'Панель администратора',
      subtitle: 'Система автоматизации восстановления кредита',
      logout: 'Выход',
      stats: {
        totalClients: 'Всего клиентов',
        pending: 'В ожидании',
        inProgress: 'В процессе',
        completed: 'Завершено'
      },
      allClients: 'Все клиенты',
      manageClients: 'Управление и мониторинг дел клиентов',
      search: 'Поиск клиентов...',
      filterStatus: 'Фильтр по статусу',
      allStatuses: 'Все статусы',
      table: {
        name: 'Имя',
        email: 'Email',
        status: 'Статус',
        created: 'Создано',
        actions: 'Действия',
        viewDetails: 'Просмотр',
        noClients: 'Клиенты не найдены'
      }
    },
    // Statuses
    statuses: {
      pending: 'Ожидание проверки',
      documents_verified: 'Документы проверены',
      freeze_completed: 'Freeze завершен',
      letters_sent: 'Письма отправлены',
      ftc_created: 'FTC отчет создан',
      cfpb_filed: 'CFPB жалоба подана',
      result_received: 'Результат получен',
      completed: 'Завершено'
    },
    common: {
      loading: 'Загрузка...',
      error: 'Ошибка',
      success: 'Успешно'
    }
  }
};

export const t = (language, key) => {
  const keys = key.split('.');
  let value = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};
