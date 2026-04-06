import { useState } from "react";
import "../styles/transactions.css";
import AddTransactionModal from "../components/insights/AddTransactionModal";

export default function Transactions({
  transactions = [],
  setTransactions,
  user,
}) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const role = (user?.role || "").toLowerCase().trim();
  const isAdmin = role === "admin";

  const filtered = transactions.filter((t) =>
    t?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (!isAdmin) return;
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAdd = () => {
    if (!isAdmin) return;
    setEditingTransaction(null);
    setShowModal(true);
  };

  const handleEdit = (transaction) => {
    if (!isAdmin) return;
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  return (
    <div className="transactions-page">
      {/* TOP BAR */}
      <div className="top-bar">
        <h2>Transactions</h2>

        <input
          className="search-input"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isAdmin && (
          <button className="add-btn" onClick={handleAdd}>
            + Add
          </button>
        )}
      </div>

      {/* ✅ HEADER */}
      <div className="transaction-header">
        <div>Title</div>
        <div>Category</div>
        <div>Date</div>
        <div>Amount</div>
        {isAdmin && <div>Actions</div>}
      </div>

      {/* LIST */}
      <div className="list">
        {filtered.length === 0 ? (
          <p className="empty">No transactions found</p>
        ) : (
          filtered.map((t) => (
            <div className="transaction-item" key={t.id}>
              {/* ✅ COLUMN 1 */}
              <div>{t.title}</div>

              {/* ✅ COLUMN 2 */}
              <div>{t.category}</div>

              {/* ✅ COLUMN 3 (DATE FIX) */}
              <div>
                {t.date
                  ? new Date(t.date).toLocaleDateString("en-IN")
                  : "-"}
              </div>

              {/* ✅ COLUMN 4 */}
              <div className={t.amount > 0 ? "income" : "expense"}>
                ₹{t.amount}
              </div>

              {/* ✅ COLUMN 5 */}
              {isAdmin && (
                <div className="actions">
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
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      {isAdmin && showModal && (
        <AddTransactionModal
          onClose={() => {
            setShowModal(false);
            setEditingTransaction(null);
          }}
          editData={editingTransaction}
          setTransactions={setTransactions}
          transactions={transactions}
        />
      )}
    </div>
  );
}