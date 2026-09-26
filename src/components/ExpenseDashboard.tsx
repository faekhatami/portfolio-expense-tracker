type ExpenseDashboardProps = {
  totalExpenses: number;
  totalAmount: number;
  categoriesUsed: number;
  highestExpense: number;
};

export default function ExpenseDashboard({
  totalExpenses,
  totalAmount,
  categoriesUsed,
  highestExpense,
}: ExpenseDashboardProps) {
  const cards = [
    {
      label: "Total Expenses",
      value: totalExpenses.toString(),
    },
    {
      label: "Total Amount",
      value: `$${totalAmount.toFixed(2)}`,
    },
    {
      label: "Categories",
      value: categoriesUsed.toString(),
    },
    {
      label: "Highest Expense",
      value: `$${highestExpense.toFixed(2)}`,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-2xl bg-slate-900 p-5 shadow-lg ring-1 ring-slate-800"
        >
          <p className="text-sm text-slate-400">
            {card.label}
          </p>

          <p className="mt-2 text-2xl font-bold text-white">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}