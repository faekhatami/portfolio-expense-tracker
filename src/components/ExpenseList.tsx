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
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="rounded border p-4"
          >
            <h2 className="font-semibold">
              {expense.title}
            </h2>
  
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <p>Date: {expense.expense_date}</p>
  
            {expense.description && (
              <p>
                Description: {expense.description}
              </p>
            )}
  
            <button
              onClick={() => onEdit(expense)}
              className="mt-4 mr-2 rounded bg-blue-600 px-4 py-2 text-white"
            >
              Edit
            </button>
  
            <button
              onClick={() => onDelete(expense.id)}
              className="mt-4 rounded bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }