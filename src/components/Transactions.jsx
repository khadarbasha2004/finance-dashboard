import { useState } from "react";
import useTransactions from "../hooks/useTransactions";
import "../styles/transactions.css";

function Transactions({ user }) {
  const { transactions, setTransactions } = useTransactions();
  const [search, setSearch] = useState("");

  // 🔍 FILTER
  const filtered = transactions.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  // ➕ ADD
  const handleAdd = () => {
    if (user.role !== "admin") return;

    const title = prompt("Enter title");
    const amount = Number(prompt("Enter amount"));

    if (!title || !amount) return;

    const newTransaction = {
      id: Date.now(),
      title,
      amount,
      category: "General",
      date: new Date().toISOString().slice(0, 10),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // ✏️ EDIT
  const handleEdit = (t) => {
    if (user.role !== "admin") return;

    const newTitle = prompt("Edit title", t.title);
    const newAmount = Number(prompt("Edit amount", t.amount));

    setTransactions((prev) =>
      prev.map((item) =>
        item.id === t.id
          ? { ...item, title: newTitle, amount: newAmount }
          : item
      )
    );
  };

  // 🗑 DELETE
  const handleDelete = (id) => {
    if (user.role !== "admin") return;

    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="transactions">
      {/* 🔥 HEADER */}
      <div className="transactions-header">
        <h3>Recent Transactions</h3>

        {/* 🔍 SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* ➕ ADMIN ONLY */}
        {user.role === "admin" && (
          <button className="add-btn" onClick={handleAdd}>
            + Add
          </button>
        )}
      </div>

      {/* 📊 TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
            {user.role === "admin" && <th>Actions</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.category}</td>
              <td>{t.date}</td>

              <td className={t.amount > 0 ? "green" : "red"}>
                ₹{t.amount}
              </td>

              {/* 🔐 ADMIN ONLY */}
              {user.role === "admin" && (
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(t)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.id)}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;