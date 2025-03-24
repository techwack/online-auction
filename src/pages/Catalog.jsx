const dummyAuctions = [
    { id: 1, title: 'Vintage Watch', price: 1200 },
    { id: 2, title: 'Rare Comic Book', price: 800 },
    { id: 3, title: 'Antique Vase', price: 2000 }
  ];
  
  export default function Catalog() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Auction Catalog</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {dummyAuctions.map(item => (
            <div key={item.id} className="border p-4 rounded shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-600">Starting Price: ₹{item.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Place Bid</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  