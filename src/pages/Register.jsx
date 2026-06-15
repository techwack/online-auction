import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = await register(formData.name, formData.email, formData.password);
    setLoading(false);
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/catalog");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Register</h2>
        {error && <p style={{ color: "red", marginBottom: "10px", fontSize: "14px" }}>{error}</p>}
        <form onSubmit={handleSubmit} style={formStyle}>
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={inputStyle} />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#007BFF", cursor: "pointer" }}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

const wrapperStyle = { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f4f4f4" };
const cardStyle = { backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.1)", width: "350px", textAlign: "center" };
const formStyle = { display: "flex", flexDirection: "column", gap: "15px" };
const inputStyle = { padding: "10px 15px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" };
const buttonStyle = { padding: "10px 15px", borderRadius: "6px", border: "none", backgroundColor: "#28a745", color: "white", fontSize: "16px", cursor: "pointer" };
const titleStyle = { marginBottom: "20px", color: "#333" };

export default Register;
