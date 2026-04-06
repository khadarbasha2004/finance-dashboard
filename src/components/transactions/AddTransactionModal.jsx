import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";

const AddTransactionModal = ({ onClose }) => {
  const { transactions, setTransactions } = useTransactions();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setTransactions([newTransaction, ...transactions]);
    onClose();
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Add Transaction</h3>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="amount" type="number" placeholder="Amount" onChange={handleChange} required />
          <input name="category" placeholder="Category" onChange={handleChange} required />
          <input name="date" type="date" onChange={handleChange} required />

          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "10px",
    width: "300px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },
};

export default AddTransactionModal;