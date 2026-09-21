type ExpenseChartProps = {
    categoryTotals: Record<string, number>;
    totalAmount: number;
  };
  
  export default function ExpenseChart({
    categoryTotals,
    totalAmount,
  }: ExpenseChartProps) {
    return (
      <div className="mb-8 rounded border p-4">
        <h2 className="mb-4 text-xl font-bold">
          Expenses by Category
        </h2>
  
        <div className="space-y-4">
          {Object.entries(categoryTotals).map(
            ([category, total]) => {
              const width =
                totalAmount === 0
                  ? 0
                  : (total / totalAmount) * 100;
  
              return (
                <div key={category}>
                  <div className="mb-1 flex justify-between">
                    <span>{category}</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
  
                  <div className="h-4 rounded bg-gray-200">
                    <div
                      className="h-4 rounded bg-black"
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