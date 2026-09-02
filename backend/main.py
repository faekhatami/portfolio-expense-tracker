from fastapi import FastAPI
from database import get_connection

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Expense Tracker API is running"}


@app.get("/test-db")
def test_db():
    connection = get_connection()
    connection.close()

    return {"message": "Database connection successful"}