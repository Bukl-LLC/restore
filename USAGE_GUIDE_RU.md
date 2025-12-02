# Руководство по использованию системы CRAS

## Обзор

Система автоматизации кредитного восстановления (CRAS) - это приложение для приема заявок клиентов и отслеживания прогресса восстановления кредита.

## Реализованные функции

### ✅ Модуль приема заявок
- Веб-форма для ввода данных клиента
- Загрузка документов (водительское удостоверение, подтверждение адреса)
- Валидация всех полей в реальном времени
- Автоматическое создание учетной записи клиента
- Генерация пароля для доступа к личному кабинету

### ✅ Личный кабинет клиента
- Визуальный timeline прогресса дела (8 этапов)
- Просмотр личной информации
- История изменений статуса
- Список загруженных документов
- JWT авторизация

### ✅ Админ-панель
- Dashboard со статистикой
  - Общее количество клиентов
  - Клиенты в ожидании
  - Клиенты в процессе
  - Завершенные дела
- Таблица всех клиентов с фильтрацией и поиском
- Детальный просмотр информации клиента
- Обновление статуса дела
- Добавление заметок к изменениям статуса
- История всех изменений

## Архитектура

### Backend (FastAPI + Python)
- **API URL**: `https://product-showcase-197.preview.emergentagent.com/api`
- **База данных**: MongoDB
- **Аутентификация**: JWT токены
- **Загрузка файлов**: Локальное хранилище на сервере

### Frontend (React)
- **URL**: `https://product-showcase-197.preview.emergentagent.com`
- **UI библиотека**: Radix UI + Tailwind CSS
- **Роутинг**: React Router
- **HTTP клиент**: Axios

## Учетные данные по умолчанию

### Администратор
- **Email**: admin@cras.com
- **Password**: admin123

### Тестовый клиент
- **Email**: john.doe@example.com
- **Password**: 0ZvhucnBqkSh

## Статусы дела

1. **Pending** (Ожидание) - Заявка получена
2. **Documents Verified** (Документы проверены) - Все документы проверены и одобрены
3. **Freeze Completed** (Freeze завершен) - Credit freeze выполнен в LexisNexis и Innovis
4. **Letters Sent** (Письма отправлены) - Письма отправлены в кредитные бюро
5. **FTC Created** (FTC создан) - FTC Report создан
6. **CFPB Filed** (CFPB подана) - Жалоба CFPB подана
7. **Result Received** (Результат получен) - Получен ответ от CFPB
8. **Completed** (Завершено) - Дело закрыто

## API Endpoints

### Публичные
- `POST /api/clients/submit` - Подача заявки
- `POST /api/auth/login` - Вход в систему

### Для клиентов
- `GET /api/clients/me/dashboard` - Получить данные dashboard

### Для администраторов
- `GET /api/admin/clients` - Список всех клиентов
- `GET /api/admin/clients/{id}` - Детали клиента
- `PATCH /api/admin/clients/{id}/status` - Обновить статус
- `GET /api/admin/stats` - Статистика

## Структура файлов

```
/app/
├── backend/
│   ├── server.py          # Основной файл API
│   ├── requirements.txt   # Python зависимости
│   ├── uploads/           # Загруженные файлы
│   └── .env              # Переменные окружения
│
├── frontend/
│   ├── src/
│   │   ├── App.js                      # Роутинг
│   │   ├── pages/
│   │   │   ├── Home.js                 # Форма заявки
│   │   │   ├── Success.js              # Страница успеха
│   │   │   ├── Login.js                # Вход
│   │   │   ├── ClientDashboard.js      # Личный кабинет
│   │   │   ├── AdminDashboard.js       # Админ панель
│   │   │   └── AdminClientDetail.js    # Детали клиента
│   │   ├── services/
│   │   │   └── api.js                  # API клиент
│   │   ├── context/
│   │   │   └── AuthContext.js          # Контекст авторизации
│   │   └── components/ui/              # UI компоненты
│   └── package.json
```

## Запуск локально

### Backend
```bash
cd /app/backend
pip install -r requirements.txt
sudo supervisorctl restart backend
```

### Frontend
```bash
cd /app/frontend
yarn install
sudo supervisorctl restart frontend
```

### Проверка статуса
```bash
sudo supervisorctl status
```

## Следующие этапы (не реализовано)

### Фаза 2 - Основная автоматизация
- Интеграция с Google Drive API
- Автоматизация Credit Freeze (LexisNexis, Innovis)
- Автоматическая генерация и отправка писем (Lob.com)
- Автоматизация FTC Report
- Автоматизация CFPB жалоб
- Система отложенных задач (Celery + Redis)
- Email уведомления (SendGrid)

### Фаза 3 - AI и продвинутые функции
- Интеграция AI Voice для телефонных диспутов
- SMS уведомления (Twilio)
- Электронная подпись (DocuSign)
- Платежная система (Stripe)
- Браузерная автоматизация (Playwright)

### Фаза 4 - Оптимизация
- Security audit
- Performance optimization
- Тестирование нагрузки
- Полная документация

## Технические детали

### База данных MongoDB

**Collections:**
- `clients` - Данные клиентов и заявки
- `users` - Пользователи системы (клиенты и админы)
- `files` - Метаданные загруженных файлов

### Безопасность
- Пароли хешируются с использованием bcrypt
- JWT токены для аутентификации
- CORS настроен для безопасного доступа
- Валидация на уровне API и UI

### Загрузка файлов
- Файлы сохраняются в `/app/backend/uploads/`
- Каждому файлу присваивается уникальный UUID
- Метаданные хранятся в MongoDB

## Тестирование

### Тест подачи заявки (curl)
```bash
curl -X POST http://localhost:8001/api/clients/submit \
  -F "first_name=Test" \
  -F "last_name=User" \
  -F "email=test@example.com" \
  -F "phone=+12345678901" \
  -F "date_of_birth=1990-01-15" \
  -F "ssn=123-45-6789" \
  -F "address=123 Main St" \
  -F "city=New York" \
  -F "state=NY" \
  -F "zip_code=10001" \
  -F "agreed_to_terms=true" \
  -F "driver_license=@/path/to/dl.pdf" \
  -F "billing_address_proof=@/path/to/bill.pdf"
```

### Тест логина
```bash
curl -X POST http://localhost:8001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@cras.com", "password": "admin123"}'
```

## Поддержка

Для вопросов и проблем обращайтесь к документации FastAPI и React.

---

**Версия**: 1.0.0 (Фаза 1 - MVP)  
**Дата**: Декабрь 2025
