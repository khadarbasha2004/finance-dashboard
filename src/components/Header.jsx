export default function Header({
  user,
  setUser,
  page,
  setSidebarOpen,
  darkMode,
  setDarkMode,
}) {
  const handleRoleChange = (e) => {
    const newRole = e.target.value;

    setUser((prev) => ({
      ...prev,
      role: newRole,
    }));
  };

  const titles = {
    dashboard: "Dashboard",
    transactions: "Transactions",
    insights: "Insights",
  };

  return (
    <header className="header">
      {/* 🔥 LEFT SIDE */}
      <div className="header-left">
        <h2>{titles[page]}</h2>
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="header-right">
        {/* 🌙 THEME TOGGLE */}
        <div
          className="theme-switch"
          onClick={() => setDarkMode(!darkMode)}
        >
          <div className={`switch ${darkMode ? "active" : ""}`}>
            <div className="thumb"></div>
          </div>
          <span className="theme-label">
            {darkMode ? "Dark" : "Light"}
          </span>
        </div>

        {/* ROLE */}
        <div className="role-container">
          <label className="role-label">Role</label>

          <select
            className="role-select"
            value={user.role}
            onChange={handleRoleChange}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>
      </div>
    </header>
  );
}