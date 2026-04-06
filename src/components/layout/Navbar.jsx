const Navbar = () => {
  return (
    <div style={styles.navbar}>
      <h3>Dashboard</h3>
      <div>User</div>
    </div>
  );
};

const styles = {
  navbar: {
    height: "60px",
    background: "#ffffff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 20px",
    borderBottom: "1px solid #e5e7eb",
  },
};

export default Navbar;