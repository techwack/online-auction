import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getItems, placeBid } from "../services/api";

function Catalog() {
  const [items, setItems] = useState([]);
  const [bidAmounts, setBidAmounts] = useState({});
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleBidChange = (id, value) =>
    setBidAmounts({ ...bidAmounts, [id]: value });

  const handlePlaceBid = async (item) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const amount = parseFloat(bidAmounts[item.id]);
    if (!amount) return setMessages({ ...messages, [item.id]: "Enter a bid amount" });

    const data = await placeBid(item.id, amount);
    if (data.currentBid !== undefined) {
      setItems(items.map(i => i.id === item.id ? data : i));
      setBidAmounts({ ...bidAmounts, [item.id]: "" });
      setMessages({ ...messages, [item.id]: `Bid of $${amount} placed!` });
    } else {
      setMessages({ ...messages, [item.id]: data.message });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Loading auction items...</p>;

  return (
    <div style={{ padding: "40px", backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h2 style={{ margin: 0 }}>Auction Catalog</h2>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          {user && <span style={{ fontSize: "14px", color: "#555" }}>Hello, {user.name}</span>}
          {user ? (
            <>
              <button onClick={() => navigate("/dashboard")} style={navBtnStyle("#007BFF")}>+ List Item</button>
              <button onClick={handleLogout} style={navBtnStyle("#dc3545")}>Logout</button>
            </>
          ) : (
            <button onClick={() => navigate("/login")} style={navBtnStyle("#007BFF")}>Login to Bid</button>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "24px" }}>
        {items.map((item) => (
          <div key={item.id} style={cardStyle}>
            <img src={item.image} alt={item.name} style={{ width: "100%", height: "160px", objectFit: "cover", borderRadius: "6px" }} />
            <h3 style={{ margin: "12px 0 4px" }}>{item.name}</h3>
            <p style={{ fontSize: "13px", color: "#666", margin: "0 0 8px" }}>{item.description}</p>
            <p style={{ fontWeight: "bold", color: "#28a745", margin: "4px 0" }}>Current Bid: ${item.currentBid}</p>
            {item.currentBidder && <p style={{ fontSize: "12px", color: "#888", margin: "2px 0" }}>Leader: {item.currentBidder}</p>}
            <p style={{ fontSize: "12px", color: "#aaa", margin: "2px 0 12px" }}>Ends: {new Date(item.endDate).toLocaleDateString()}</p>
            <div style={{ display: "flex", gap: "6px" }}>
              <input
                type="number"
                placeholder={`> $${item.currentBid}`}
                value={bidAmounts[item.id] || ""}
                onChange={(e) => handleBidChange(item.id, e.target.value)}
                style={{ flex: 1, padding: "6px 10px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
              />
              <button onClick={() => handlePlaceBid(item)} style={bidBtnStyle}>Bid</button>
            </div>
            {messages[item.id] && (
              <p style={{ fontSize: "12px", marginTop: "6px", color: messages[item.id].includes("placed") ? "#28a745" : "#dc3545" }}>
                {messages[item.id]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: "white", border: "1px solid #ddd", padding: "16px", borderRadius: "10px",
  width: "260px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};
const bidBtnStyle = { padding: "6px 14px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", fontSize: "14px" };
const navBtnStyle = (bg) => ({ padding: "8px 14px", backgroundColor: bg, color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" });

export default Catalog;
