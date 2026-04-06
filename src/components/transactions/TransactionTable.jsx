import { useState } from "react";
import useTransactions from "../../hooks/useTransactions";
import TransactionRow from "./TransactionRow";
import AddTransactionModal from "./AddTransactionModal";

const TransactionTable = () => {
  const { transactions } = useTransactions();
  const [showModal, setShowModal] = useState(false);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h3>Recent Transactions</h3>
        <button onClick={() => setShowModal(true)}>+ Add</button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))}
        </tbody>
      </table>

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

const styles = {
  container: {
    marginTop: "30px",
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  table: {
    width: "100%",
    marginTop: "10px",
    borderCollapse: "collapse",
  },
};

export default TransactionTable;