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
