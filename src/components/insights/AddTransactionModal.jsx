import { useState } from "react";
import "../../styles/modal.css";

const categories = [
  { name: "Salary", type: "income" },
  { name: "Freelance", type: "income" },
  { name: "Food", type: "expense" },
  { name: "Travel", type: "expense" },
  { name: "Shopping", type: "expense" },
];

const AddTransactionModal = ({
  onClose,
  editData,
  transactions,
  setTransactions,
}) => {
  const [form, setForm] = useState({
    title: editData?.title || "",
    amount: editData?.amount || "",
    category: editData?.category || "Salary",
    date: editData?.date || new Date().toISOString().split("T")[0], // ✅ FIX
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedCategory = categories.find(
      (c) => c.name === form.category
    );

    let finalAmount = Number(form.amount);

    if (selectedCategory.type === "expense") {
      finalAmount = -Math.abs(finalAmount);
    } else {
      finalAmount = Math.abs(finalAmount);
    }

    const updatedData = {
      ...form,
      amount: finalAmount,
      date: form.date || new Date().toISOString(),
    };

    if (editData) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editData.id ? { ...t, ...updatedData } : t
        )
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...updatedData,
      };

      setTransactions((prev) => [newTransaction, ...prev]);
    }

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            {categories.map((c) => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.type})
              </option>
            ))}
          </select>

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save">
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;