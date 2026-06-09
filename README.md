# Mstore - E-Commerce Application

A full-stack e-commerce web application built with Django REST Framework and React.

## Tech Stack

**Backend**
- Python 3.12
- Django 6.0 + Django REST Framework
- PostgreSQL 18
- JWT Authentication

**Frontend**
- React + Vite
- Context API for state management

## Features

- Product listing and detail pages
- Shopping cart
- Checkout flow
- User authentication

## Project Structure

```
ECOMMERCE_PROJECT/
├── backend/     # Django REST Framework API
└── frontend/    # React + Vite
```

## Getting Started

**Backend**
```bash
cd backend
python -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend folder:

```
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_postgresql_url
```
