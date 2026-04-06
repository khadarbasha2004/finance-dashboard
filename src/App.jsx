import { useState, useEffect } from "react";

import Header from "./components/Header";
import Sidebar from "./components/layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

import mockData from "./data/mockData";

function App() {
  // ✅ USER
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser
        ? JSON.parse(savedUser)
        : { name: "Khader", role: "viewer" };
    } catch {
      return { name: "Khader", role: "viewer" };
    }
  });

  // ✅ DARK MODE 🔥
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Apply theme to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // ✅ SIDEBAR STATE
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [page, setPage] = useState("dashboard");

  // ✅ TRANSACTIONS
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem("transactions");
      return saved ? JSON.parse(saved) : mockData;
    } catch {
      return mockData;
    }
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <div className="app-container">
      {/* ✅ Sidebar */}
      <Sidebar
        setPage={setPage}
        page={page}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ✅ Main */}
      <div className="main">
        <Header
          user={user}
          setUser={setUser}
          page={page}
          setSidebarOpen={setSidebarOpen}
        />

        {/* 🌙 DARK MODE BUTTON */}
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        {page === "dashboard" && (
          <Dashboard transactions={transactions} user={user} />
        )}

        {page === "transactions" && (
          <Transactions
            user={user}
            transactions={transactions}
            setTransactions={setTransactions}
          />
        )}

        {page === "insights" && (
          <Insights transactions={transactions} />
        )}
      </div>
    </div>
  );
}

export default App;