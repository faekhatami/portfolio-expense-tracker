type ExpenseChartProps = {
  categoryTotals: Record<string, number>;
};

export default function ExpenseChart({
  categoryTotals,
}: ExpenseChartProps) {
  const totalAmount = Object.values(categoryTotals).reduce(
    (total, amount) => total + amount,
    0
  );

  return (
    <div className="rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-slate-800">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white">
          Spending by Category
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          See how your spending is distributed across categories.
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(categoryTotals).map(
          ([category, amount]) => {
            const width =
              totalAmount === 0
                ? 0
                : (amount / totalAmount) * 100;

            return (
              <div key={category}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-300">
                    {category}
                  </span>

                  <span className="text-slate-400">
                    ${amount.toFixed(2)}
                  </span>
                </div>

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}