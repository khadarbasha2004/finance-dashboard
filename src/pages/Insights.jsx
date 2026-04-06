import "../styles/dashboard.css";

export default function Insights({ transactions }) {
  
  // ✅ No data case
  if (!transactions || transactions.length === 0) {
    return (
      <div className="dashboard">
        <h1 className="title">Insights</h1>
        <div className="card">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  // ✅ Calculations
  let income = 0;
  let expense = 0;
  const categoryTotals = {};
  const monthlyTotals = {};

  transactions.forEach((t) => {
    if (t.amount > 0) {
      income += t.amount;
    } else {
      expense += t.amount;

      // Category totals
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + Math.abs(t.amount);
    }

    // Monthly totals
    const month = t.date.slice(0, 7);
    monthlyTotals[month] =
      (monthlyTotals[month] || 0) + t.amount;
  });

  // ✅ Highest spending category
  const highestCategory = Object.keys(categoryTotals).reduce(
    (a, b) =>
      categoryTotals[a] > categoryTotals[b] ? a : b,
    Object.keys(categoryTotals)[0]
  );

  return (
    <div className="dashboard">
     

      {/* SUMMARY CARDS */}
      <div className="cards">
        <div className="card">
          <p>Total Income</p>
          <h2>₹{income.toLocaleString()}</h2>
        </div>

        <div className="card">
          <p>Total Expenses</p>
          <h2>₹{Math.abs(expense).toLocaleString()}</h2>
        </div>

        <div className="card">
          <p>Top Spending Category</p>
          <h2>{highestCategory || "N/A"}</h2>
        </div>
      </div>

      {/* MONTHLY SUMMARY */}
      <div className="overview-card">
        <h3>Monthly Summary</h3>

        {Object.entries(monthlyTotals).map(([month, total]) => (
          <p key={month} style={{ marginBottom: "8px" }}>
            📅 {month} → ₹{total.toLocaleString()}
          </p>
        ))}
      </div>

      {/* SMART OBSERVATION */}
      <div className="card">
        <h3>Observation</h3>
        <p style={{ marginTop: "10px" }}>
          {Math.abs(expense) > income
            ? "⚠️ Your expenses are higher than your income. Try to reduce spending."
            : "✅ Good job! You are saving money this period."}
        </p>
      </div>
    </div>
  );
}