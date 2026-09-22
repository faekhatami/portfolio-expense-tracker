from datetime import date, datetime

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from database import get_connection
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExpenseCreate(BaseModel):
    title: str
    amount: float
    category: str
    expense_date: str
    description: str | None = None

class ExpenseUpdate(BaseModel):
    title: str
    amount: float
    category: str
    expense_date: str
    description: str | None = None

class ExpenseResponse(BaseModel):
    id: int
    title: str
    amount: float
    category: str
    expense_date: date
    description: str | None = None
    created_at: datetime

@app.get("/")
def root():
    return {"message": "Expense Tracker API is running"}

@app.get("/test-db")
def test_db():
    connection = get_connection()
    connection.close()


    return {"message": "Database connection successful"}


@app.get("/expenses", response_model=list[ExpenseResponse])
def get_expenses(
    category: str | None = None,
    expense_date: str | None = None,
    search: str | None = None,
):
    connection = get_connection()
    cursor = connection.cursor()

    query = "SELECT * FROM expenses"
    conditions = []
    params = []

    if category:
        conditions.append("category = %s")
        params.append(category)

    if expense_date:
        conditions.append("expense_date = %s")
        params.append(expense_date)

    if search:
        conditions.append("title ILIKE %s")
        params.append(f"%{search}%")

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY expense_date DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()

    expenses = []

    for row in rows:
        expense = {
            "id": row[0],
            "title": row[1],
            "amount": row[2],
            "category": row[3],
            "expense_date": row[4],
            "description": row[5],
            "created_at": row[6],
        }

        expenses.append(expense)

    cursor.close()
    connection.close()

    return expenses


@app.get("/expenses/{expense_id}", response_model=ExpenseResponse)
def get_expense(expense_id: int):
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(
    "SELECT * FROM expenses WHERE id = %s;",
    (expense_id,)
)

    row = cursor.fetchone()

    cursor.close()
    connection.close()

    if row is None:
        raise HTTPException(
            status_code=404,
            detail="Expense not found"
    )

    return {
    "id": row[0],
    "title": row[1],
    "amount": row[2],
    "category": row[3],
    "expense_date": row[4],
    "description": row[5],
    "created_at": row[6],
    }


@app.post("/expenses")
def create_expense(expense: ExpenseCreate):
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(
        """
        INSERT INTO expenses (
            title,
            amount,
            category,
            expense_date,
            description
        )
         VALUES (%s, %s, %s, %s, %s);
        """,
        (
            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date,
            expense.description,
        )
    )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Expense created successfully"}


@app.put("/expenses/{expense_id}")
def update_expense(expense_id: int, expense: ExpenseUpdate):
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(
        """
        UPDATE expenses
        SET
            title = %s,
            amount = %s,
            category = %s,
            expense_date = %s,
            description = %s
        WHERE id = %s;
        """,
        (
            expense.title,
            expense.amount,
            expense.category,
            expense.expense_date,
            expense.description,
            expense_id,
        )
    )

    if cursor.rowcount == 0:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Expense updated successfully"}


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: int):
    connection = get_connection()
    cursor = connection.cursor()


    cursor.execute(
        "DELETE FROM expenses WHERE id = %s;",
        (expense_id,)
    )

    if cursor.rowcount == 0:
        cursor.close()
        connection.close()

        raise HTTPException(
            status_code=404,
            detail="Expense not found"
        )

    connection.commit()

    cursor.close()
    connection.close()

    return {"message": "Expense deleted successfully"}

