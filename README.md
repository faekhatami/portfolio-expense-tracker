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


## Database Setup

Create a PostgreSQL database named:

`expense_tracker`

The application uses PostgreSQL to store expense data.

## API

The backend provides REST API endpoints for managing expenses.

Main endpoints:

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

## Screenshots

### Dashboard

_Add a screenshot of the application UI here._

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
