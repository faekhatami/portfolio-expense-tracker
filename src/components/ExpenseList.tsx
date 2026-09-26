type Expense = {
  id: number;
  title: string;
  amount: number;
  category: string;
  expense_date: string;
  description: string | null;
  created_at: string;
};

type ExpenseListProps = {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: number) => void;
};

export default function ExpenseList({
  expenses,
  onEdit,
  onDelete,
}: ExpenseListProps) {
  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="rounded-xl border border-slate-800 bg-slate-800/60 p-4 transition hover:border-slate-700 hover:bg-slate-800"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-semibold text-white">
                  {expense.title}
                </h3>

                <span className="rounded-full bg-blue-950 px-2.5 py-1 text-xs font-medium text-blue-400">
                  {expense.category}
                </span>
              </div>

              {expense.description && (
                <p className="mt-1 text-sm text-slate-400">
                  {expense.description}
                </p>
              )}

              <p className="mt-2 text-xs text-slate-500">
                {expense.expense_date}
              </p>
            </div>

            <div className="flex flex-col items-start gap-3 sm:items-end">
              <p className="text-lg font-bold text-white">
                ${expense.amount.toFixed(2)}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(expense)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-300 transition hover:border-blue-600 hover:text-blue-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => onDelete(expense.id)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-red-400 transition hover:border-red-500 hover:bg-red-950/30"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}