export default function Cards({ balance, income, expenses }) {
  return (
    <div className="cards">
      <div className="card balance">
        <p>Total Balance</p>
        <h2>₹{balance.toLocaleString()}</h2>
      </div>

      <div className="card income">
        <p>Income</p>
        <h2>₹{income.toLocaleString()}</h2>
      </div>

      <div className="card expense">
        <p>Expenses</p>
        <h2>₹{Math.abs(expenses).toLocaleString()}</h2>
      </div>
    </div>
  );
}