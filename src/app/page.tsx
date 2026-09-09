"use client";

import { FormEvent, useEffect, useState } from "react";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  description: string | null;
  created_at: string;
};

export default function Home() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/expenses")
      .then((response) => response.json())
      .then((data) => {
        setExpenses(data);
      });
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        amount: Number(amount),
        category,
        expense_date: expenseDate,
        description: description || null,
      }),
    });

    if (response.ok) {
      const newExpense = await response.json();

      console.log(newExpense);

      setTitle("");
      setAmount("");
      setCategory("");
      setExpenseDate("");
      setDescription("");

      const updatedExpenses = await fetch(
        "http://127.0.0.1:8000/expenses"
      );

      const data = await updatedExpenses.json();
      setExpenses(data);
    }
  }

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="w-full rounded border p-2"
        />

        <input
          type="date"
          value={expenseDate}
          onChange={(event) => setExpenseDate(event.target.value)}
          className="w-full rounded border p-2"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="rounded bg-black px-5 py-2 text-white"
        >
          Add Expense
        </button>
      </form>

      <div className="space-y-4">
        {expenses.map((expense) => (
          <div key={expense.id} className="rounded border p-4">
            <h2 className="font-semibold">{expense.title}</h2>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.expense_date}</p>

            {expense.description && (
              <p>Description: {expense.description}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}