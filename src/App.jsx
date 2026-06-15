import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";
import Dashboard from "./pages/Dashboard";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "12px 24px", backgroundColor: "#1a1a2e", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <span style={{ color: "white", fontWeight: "bold", fontSize: "18px" }}>🏷️ AuctionHub</span>
      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <Link to="/catalog" style={linkStyle}>Catalog</Link>
        {user ? (
          <>
            <Link to="/dashboard" style={linkStyle}>List Item</Link>
            <span style={{ color: "#aaa", fontSize: "14px" }}>{user.name}</span>
            <button onClick={handleLogout} style={btnStyle}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={{ ...linkStyle, backgroundColor: "#28a745", padding: "6px 14px", borderRadius: "6px" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

const linkStyle = { color: "#ccc", textDecoration: "none", fontSize: "15px" };
const btnStyle = { padding: "6px 14px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" };

export default App;
