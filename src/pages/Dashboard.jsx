import "../styles/dashboard.css";
import FinanceChart from "../components/FinanceChart";

export default function Dashboard({ transactions }) {
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expenses;

  return (
    <div className="dashboard">
    

      {/* ✅ CARDS */}
      <div className="cards">
        <div className="stat-card">
          <p>Total Balance</p>
          <h2>₹{balance.toLocaleString()}</h2>
        </div>

        <div className="stat-card income">
          <p>Income</p>
          <h2>₹{income.toLocaleString()}</h2>
        </div>

        <div className="stat-card expense">
          <p>Expenses</p>
          <h2>₹{Math.abs(expenses).toLocaleString()}</h2>
        </div>
      </div>

      {/* ✅ CHARTS */}
      <div className="overview-section">
        <h2>Overview</h2>

        <div className="grid-2">
          <div className="chart-card">
            <h3>Income vs Expenses</h3>
            <FinanceChart
              type="bar"
              transactions={transactions}
              income={income}
              expenses={expenses}
            />
          </div>

          <div className="chart-card">
            <h3>Spending Breakdown</h3>
            <FinanceChart type="pie" transactions={transactions} />
          </div>
        </div>

        <div className="chart-card">
          <h3>Monthly Trend</h3>
          <FinanceChart type="line" transactions={transactions} />
        </div>
      </div>
    </div>
  );
}