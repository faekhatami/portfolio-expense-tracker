# Expense Tracker

A full-stack expense tracker built with Next.js, TypeScript, FastAPI and PostgreSQL.

## Features

- Add expenses
- Edit expenses
- Delete expenses
- Search expenses
- Filter by category
- Filter by date
- Server-side filtering
- Backend validation
- Expense dashboard
- Spending by category visualization
- Loading and error states
- Responsive dark UI

## Technologies

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

### Backend
- FastAPI
- Python
- Pydantic
- Psycopg

### Database
- PostgreSQL

## Project Structure

```text
expense-tracker/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── requirements.txt
│   └── venv/
│
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   └── globals.css
│   │
│   └── components/
│       ├── ExpenseForm.tsx
│       ├── ExpenseDashboard.tsx
│       ├── ExpenseChart.tsx
│       └── ExpenseList.tsx
│
├── public/
├── package.json
└── README.md
```

## Running the Project

### Frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend runs on:

http://localhost:3000

### Backend

Create a virtual environment:

python -m venv venv

Activate it on Windows:

.\venv\Scripts\activate

Install the backend dependencies:

pip install -r requirements.txt

Create a `.env` file inside the `backend` folder:

DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/expense_tracker

Start the FastAPI server:

uvicorn main:app --reload

The API runs on:

http://127.0.0.1:8000

FastAPI Swagger documentation:

http://127.0.0.1:8000/docs

## Database Setup

Create a PostgreSQL database named:

expense_tracker

The application uses PostgreSQL to store expense data.

## API

The backend provides REST API endpoints for managing expenses.

| Method | Endpoint | Description |
|---|---|---|
| GET | `/expenses` | Get all expenses |
| GET | `/expenses/{id}` | Get one expense |
| POST | `/expenses` | Create an expense |
| PUT | `/expenses/{id}` | Update an expense |
| DELETE | `/expenses/{id}` | Delete an expense |

The `GET /expenses` endpoint supports server-side filtering by:

- Category
- Date
- Search term

## What I Practiced

This project helped me practice:

- Full-stack development
- Next.js and React
- TypeScript
- FastAPI
- PostgreSQL
- Raw SQL queries
- REST API development
- Server-side filtering
- Backend validation with Pydantic
- Frontend-backend integration
- Data visualization
- Component-based UI development
- Responsive UI design
