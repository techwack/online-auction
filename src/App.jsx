import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Catalog from "./pages/Catalog";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <nav style={{ padding: "10px", backgroundColor: "#f0f0f0" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
          <Link to="/catalog">Catalog</Link>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/catalog" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
