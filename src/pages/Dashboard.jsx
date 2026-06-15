import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/api";

function Dashboard() {
  const [formData, setFormData] = useState({ name: "", description: "", startingBid: "", endDate: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    const data = await createItem(formData);
    setLoading(false);
    if (data.id) {
      setMessage("Item listed successfully!");
      setFormData({ name: "", description: "", startingBid: "", endDate: "" });
    } else {
      setMessage(data.message || "Failed to list item");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", backgroundColor: "#f4f4f4" }}>
      <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 0 15px rgba(0,0,0,0.1)", width: "420px" }}>
        <h2 style={{ marginBottom: "8px", color: "#333" }}>List an Auction Item</h2>
        <p style={{ fontSize: "14px", color: "#666", marginBottom: "24px" }}>Welcome, {user.name}</p>

        {message && (
          <p style={{ color: message.includes("success") ? "#28a745" : "#dc3545", marginBottom: "14px", fontSize: "14px" }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <input type="text" name="name" placeholder="Item Name" value={formData.name} onChange={handleChange} required style={inputStyle} />
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} rows={3} style={{ ...inputStyle, resize: "vertical" }} />
          <input type="number" name="startingBid" placeholder="Starting Bid ($)" value={formData.startingBid} onChange={handleChange} required min="1" style={inputStyle} />
          <label style={{ fontSize: "13px", color: "#555" }}>
            Auction End Date
            <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} style={{ ...inputStyle, display: "block", marginTop: "4px" }} />
          </label>
          <button type="submit" disabled={loading} style={{ padding: "12px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer" }}>
            {loading ? "Listing..." : "List Item"}
          </button>
        </form>

        <button onClick={() => navigate("/catalog")} style={{ marginTop: "16px", background: "none", border: "none", color: "#007BFF", cursor: "pointer", fontSize: "14px" }}>
          ← Back to Catalog
        </button>
      </div>
    </div>
  );
}

const inputStyle = { padding: "10px 15px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "15px", width: "100%", boxSizing: "border-box" };

export default Dashboard;
