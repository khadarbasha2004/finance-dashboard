const TransactionRow = ({ transaction }) => {
  return (
    <tr style={styles.row}>
      <td>{transaction.title}</td>
      <td>{transaction.category}</td>
      <td>{transaction.date}</td>
      <td style={{ color: transaction.amount > 0 ? "green" : "red" }}>
        ₹{transaction.amount}
      </td>
    </tr>
  );
};

const styles = {
  row: {
    borderBottom: "1px solid #e5e7eb",
  },
};

export default TransactionRow;