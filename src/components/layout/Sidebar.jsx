import { FaHome, FaExchangeAlt, FaChartPie } from "react-icons/fa";

export default function Sidebar({
  setPage,
  page,
  sidebarOpen,
  setSidebarOpen,
}) {
  const handleClick = (p) => {
    setPage(p);
    setSidebarOpen(false);
  };

  return (
    <div
      className={`sidebar ${
        sidebarOpen ? "open" : ""
      }`}
    >
      <h1 className="logo">FinDash</h1>

      <ul>
        <li
          className={page === "dashboard" ? "active" : ""}
          onClick={() => handleClick("dashboard")}
        >
          <FaHome /> Dashboard
        </li>

        <li
          className={page === "transactions" ? "active" : ""}
          onClick={() => handleClick("transactions")}
        >
          <FaExchangeAlt /> Transactions
        </li>

        <li
          className={page === "insights" ? "active" : ""}
          onClick={() => handleClick("insights")}
        >
          <FaChartPie /> Insights
        </li>
      </ul>
    </div>
  );
}