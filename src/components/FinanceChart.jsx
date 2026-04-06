import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

export default function FinanceChart({
  transactions = [],
  income = 0,
  expenses = 0,
  type,
}) {
  // 🔹 BAR DATA
  const barData = [
    { name: "Income", value: income },
    { name: "Expenses", value: Math.abs(expenses) },
  ];

  // 🔹 PIE DATA
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.amount < 0) {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + Math.abs(t.amount);
    }
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  // 🔹 LINE DATA
  const monthlyMap = {};
  transactions.forEach((t) => {
    if (!t.date) return;

    const month = t.date.slice(0, 7);

    if (!monthlyMap[month]) {
      monthlyMap[month] = { month, income: 0, expense: 0 };
    }

    if (t.amount > 0) monthlyMap[month].income += t.amount;
    else monthlyMap[month].expense += Math.abs(t.amount);
  });

  const lineData = Object.values(monthlyMap);

  // ✅ RENDER BASED ON TYPE
  if (type === "bar") {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#6366f1" />
        </BarChart>
      </ResponsiveContainer>
    );
  }

  if (type === "pie") {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={pieData} dataKey="value" outerRadius={80} label>
            {pieData.map((_, i) => (
              <Cell key={i} fill={["#6366f1", "#22c55e", "#ef4444"][i % 3]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    );
  }

  if (type === "line") {
    return (
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={lineData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="income" stroke="#22c55e" />
          <Line dataKey="expense" stroke="#ef4444" />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return null;
}