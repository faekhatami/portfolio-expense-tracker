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
  const [editingId, setEditingId] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");

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

  async function handleDelete(id: number) {
    const response = await fetch(
      `http://127.0.0.1:8000/expenses/${id}`,
      {
        method: "DELETE",
      }
    );
  
    if (response.ok) {
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== id)
      );
    }
  }

  function handleEdit(expense: Expense) {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setExpenseDate(expense.expense_date);
    setDescription(expense.description ?? "");
  }

  async function handleUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    if (editingId === null) {
      return;
    }
  
    const response = await fetch(
      `http://127.0.0.1:8000/expenses/${editingId}`,
      {
        method: "PUT",
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
      }
    );
  
    if (response.ok) {
      setEditingId(null);
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

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory =
      categoryFilter === "" || expense.category === categoryFilter;
  
    const matchesDate =
      dateFilter === "" || expense.expense_date === dateFilter;
  
    return matchesCategory && matchesDate;
  });

  const totalExpenses = filteredExpenses.length;

  const totalAmount = filteredExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-8 text-3xl font-bold">Expense Tracker</h1>

      <form
        onSubmit={editingId === null ? handleSubmit : handleUpdate}
        className="mb-10 space-y-4"
>       <input
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
          {editingId === null ? "Add Expense" : "Update Expense"}
        </button>
      </form>

      <select
        value={categoryFilter}
        onChange={(event) => setCategoryFilter(event.target.value)}
        className="w-full rounded border p-2 bg-white text-black"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
      </select>

      <input
        type="date"
        value={dateFilter}
        onChange={(event) => setDateFilter(event.target.value)}
        className="w-full rounded border p-2"
      />

      <div className="space-y-4">
          <div className="mb-6 rounded border p-4">
            <p>Total Expenses: {totalExpenses}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
          </div>
          {filteredExpenses.map((expense) => (
            <div key={expense.id} className="rounded border p-4">
            <h2 className="font-semibold">{expense.title}</h2>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.expense_date}</p>

            {expense.description && (
              <p>Description: {expense.description}</p>
            )}
            <button
                onClick={() => handleEdit(expense)}
                className="mt-4 mr-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Edit
            </button>

            <button
                onClick={() => handleDelete(expense.id)}
                className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}