"use client";

import { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseDashboard from "../components/ExpenseDashboard";
import ExpenseChart from "../components/ExpenseChart";
import ExpenseList from "../components/ExpenseList";

type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  description: string | null;
  created_at: string;
};

const categories = [
  "Food",
  "Transport",
  "Education",
  "Shopping",
  "Entertainment",
  "Health",
  "Other",
];

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
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");

    const params = new URLSearchParams();

    if (categoryFilter) {
      params.append("category", categoryFilter);
    }

    if (dateFilter) {
      params.append("expense_date", dateFilter);
    }

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    fetch(`http://127.0.0.1:8000/expenses?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }

        return response.json();
      })
      .then((data) => {
        setExpenses(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load expenses.");
        setLoading(false);
      });
  }, [categoryFilter, dateFilter, searchTerm]);

  const resetForm = () => {
    setTitle("");
    setAmount("");
    setCategory("");
    setExpenseDate("");
    setDescription("");
    setEditingId(null);
    setFormError("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setFormError("");

    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setFormError("Amount must be greater than 0.");
      return;
    }

    if (!category) {
      setFormError("Please select a category.");
      return;
    }

    if (!expenseDate) {
      setFormError("Date is required.");
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: Number(amount),
      category,
      expense_date: expenseDate,
      description: description.trim() || null,
    };

    try {
      const url = editingId
        ? `http://127.0.0.1:8000/expenses/${editingId}`
        : "http://127.0.0.1:8000/expenses";

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
      });

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }

      resetForm();

      const updatedExpenses = await fetch(
        "http://127.0.0.1:8000/expenses"
      );

      const data = await updatedExpenses.json();
      setExpenses(data);
    } catch {
      setFormError("Failed to save expense.");
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setTitle(expense.title);
    setAmount(String(expense.amount));
    setCategory(expense.category);
    setExpenseDate(expense.expense_date);
    setDescription(expense.description || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/expenses/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== id)
      );
    } catch {
      setError("Failed to delete expense.");
    }
  };

  const totalAmount = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryTotals = expenses.reduce(
    (totals, expense) => {
      totals[expense.category] =
        (totals[expense.category] || 0) + expense.amount;

      return totals;
    },
    {} as Record<string, number>
  );

  const categoriesUsed = Object.keys(categoryTotals).length;

  const highestExpense =
    expenses.length > 0
      ? Math.max(...expenses.map((expense) => expense.amount))
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Hero */}
        <section className="mb-8 rounded-2xl bg-slate-900 px-6 py-8 shadow-lg ring-1 ring-slate-800">
          <p className="mb-2 text-sm font-medium text-blue-400">
            Personal Finance
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Expense Tracker
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Track your spending, understand your habits, and keep your
            expenses organized.
          </p>
        </section>

        {/* Add / Edit */}
        <section className="mb-8 rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-slate-800">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? "Edit Expense" : "Add Expense"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {editingId
                ? "Update the details of this expense."
                : "Add a new expense to your tracker."}
            </p>
          </div>

          <ExpenseForm
            title={title}
            amount={amount}
            category={category}
            expenseDate={expenseDate}
            description={description}
            categories={categories}
            editingId={editingId}
            formError={formError}
            setTitle={setTitle}
            setAmount={setAmount}
            setCategory={setCategory}
            setExpenseDate={setExpenseDate}
            setDescription={setDescription}
            onSubmit={handleSubmit}
            onCancel={resetForm}
          />
        </section>

        {/* Dashboard */}
        <section className="mb-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white">
              Overview
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              A quick look at your current expenses.
            </p>
          </div>

          <ExpenseDashboard
            totalExpenses={expenses.length}
            totalAmount={totalAmount}
            categoriesUsed={categoriesUsed}
            highestExpense={highestExpense}
          />
        </section>

        {/* Filters */}
        <section className="mb-8 rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-slate-800">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Find Expenses
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Search and filter your expenses.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Search
              </label>

              <input
                type="text"
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Category
              </label>

              <select
                value={categoryFilter}
                onChange={(event) =>
                  setCategoryFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">All categories</option>

                {categories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Date
              </label>

              <input
                type="date"
                value={dateFilter}
                onChange={(event) =>
                  setDateFilter(event.target.value)
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>

          {(categoryFilter || dateFilter || searchTerm) && (
            <button
              onClick={() => {
                setCategoryFilter("");
                setDateFilter("");
                setSearchTerm("");
              }}
              className="mt-4 text-sm font-medium text-blue-400 transition hover:text-blue-300"
            >
              Clear filters
            </button>
          )}
        </section>

        {/* Chart */}
        {expenses.length > 0 && (
          <section className="mb-8">
            <ExpenseChart categoryTotals={categoryTotals} />
          </section>
        )}

        {/* Expenses */}
        <section className="rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-slate-800">
          <div className="mb-5">
            <h2 className="text-xl font-semibold text-white">
              Recent Expenses
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Your latest recorded expenses.
            </p>
          </div>

          {loading && (
            <div className="rounded-lg bg-slate-800 px-4 py-6 text-center text-sm text-slate-400">
              Loading expenses...
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-900/50 bg-red-950/40 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && expenses.length === 0 && (
            <div className="rounded-lg border border-dashed border-slate-700 bg-slate-800/50 px-4 py-10 text-center">
              <p className="font-medium text-slate-300">
                No expenses found.
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Try changing your filters or add a new expense.
              </p>
            </div>
          )}

          {!loading && !error && expenses.length > 0 && (
            <ExpenseList
              expenses={expenses}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </main>
  );
}