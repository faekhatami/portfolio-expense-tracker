type ExpenseDashboardProps = {
    totalExpenses: number;
    totalAmount: number;
    categoryCount: number;
    highestExpense: number;
  };
  
  export default function ExpenseDashboard({
    totalExpenses,
    totalAmount,
    categoryCount,
    highestExpense,
  }: ExpenseDashboardProps) {
    return (
      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">
            Total Expenses
          </p>
          <p className="text-2xl font-bold">
            {totalExpenses}
          </p>
        </div>
  
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">
            Total Amount
          </p>
          <p className="text-2xl font-bold">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
  
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">
            Categories
          </p>
          <p className="text-2xl font-bold">
            {categoryCount}
          </p>
        </div>
  
        <div className="rounded border p-4">
          <p className="text-sm text-gray-500">
            Highest Expense
          </p>
          <p className="text-2xl font-bold">
            ${highestExpense.toFixed(2)}
          </p>
        </div>
      </div>
    );
  }