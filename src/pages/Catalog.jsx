function Catalog() {
  const items = [
    {
      id: 1,
      name: "Vintage Camera",
      currentBid: "$120",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 2,
      name: "Antique Clock",
      currentBid: "$80",
      image: "https://via.placeholder.com/200",
    },
    {
      id: 3,
      name: "Collectible Coin",
      currentBid: "$45",
      image: "https://via.placeholder.com/200",
    },
  ];

  return (
    <div style={{ padding: "40px", backgroundColor: "#f7f7f7", minHeight: "100vh" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Auction Catalog</h2>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px"
      }}>
        {items.map((item) => (
          <div key={item.id} style={{
            backgroundColor: "white",
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            width: "220px",
            textAlign: "center",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
          }}>
            <img src={item.image} alt={item.name} style={{ width: "100%", borderRadius: "6px" }} />
            <h3 style={{ margin: "10px 0" }}>{item.name}</h3>
            <p style={{ margin: "5px 0", fontWeight: "bold" }}>Current Bid: {item.currentBid}</p>
            <button style={{
              padding: "8px 12px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}>
              Place Bid
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
