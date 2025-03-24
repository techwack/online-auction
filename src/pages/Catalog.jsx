// src/pages/Catalog.jsx

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        padding: "20px",
      }}
    >
      <h2>Auction Catalog</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              textAlign: "center",
              width: "220px",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
            <h3>{item.name}</h3>
            <p>Current Bid: {item.currentBid}</p>
            <button>Place Bid</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catalog;
