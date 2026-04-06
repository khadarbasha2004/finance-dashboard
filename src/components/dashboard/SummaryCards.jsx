const SummaryCards = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p>Total Balance</p>
        <h2>₹25,000</h2>
      </div>

      <div style={styles.card}>
        <p>Income</p>
        <h2 style={{ color: "green" }}>₹40,000</h2>
      </div>

      <div style={styles.card}>
        <p>Expenses</p>
        <h2 style={{ color: "red" }}>₹15,000</h2>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    flex: 1,
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
};

export default SummaryCards;