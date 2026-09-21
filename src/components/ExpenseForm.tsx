import { FormEvent } from "react";

type ExpenseFormProps = {
  editingId: number | null;
  title: string;
  amount: string;
  category: string;
  expenseDate: string;
  description: string;
  formError: string;
  onTitleChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onExpenseDateChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export default function ExpenseForm({
  editingId,
  title,
  amount,
  category,
  expenseDate,
  description,
  formError,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onExpenseDateChange,
  onDescriptionChange,
  onSubmit,
}: ExpenseFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-10 space-y-4"
    >
      {formError && (
        <p className="rounded border border-red-300 bg-red-50 p-3 text-red-600">
          {formError}
        </p>
      )}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) =>
          onTitleChange(event.target.value)
        }
        className="w-full rounded border p-2"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(event) =>
          onAmountChange(event.target.value)
        }
        className="w-full rounded border p-2"
      />

      <select
        value={category}
        onChange={(event) =>
          onCategoryChange(event.target.value)
        }
        className="w-full rounded border bg-white p-2 text-black"
      >
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Education">Education</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">
          Entertainment
        </option>
        <option value="Health">Health</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        value={expenseDate}
        onChange={(event) =>
          onExpenseDateChange(event.target.value)
        }
        className="w-full rounded border p-2"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(event) =>
          onDescriptionChange(event.target.value)
        }
        className="w-full rounded border p-2"
      />

      <button
        type="submit"
        className="rounded bg-black px-5 py-2 text-white"
      >
        {editingId === null
          ? "Add Expense"
          : "Update Expense"}
      </button>
    </form>
  );
}