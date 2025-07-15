import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [query, setQuery] = useState(() => localStorage.getItem('query') || '');
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    if (query.trim() === '') return;

    const fetchData = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products");
        const filtered = res.data.products.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
        localStorage.setItem('query', query);
        localStorage.setItem('products', JSON.stringify(filtered));
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="p-4 max-w-4xl mx-auto font-sans">
      <h1 className="text-2xl font-bold mb-4 text-center">🔍 Product Search</h1>

      <input
        type="text"
        className="border p-2 w-full mb-6 rounded shadow-sm"
        placeholder="Search product..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-sm bg-white">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full h-40 object-contain mb-2 rounded"
            />
            <h2 className="font-semibold text-base">{item.title}</h2>
            <p className="text-xs text-gray-600 mb-1">📦 {item.category}</p>
            <p className="text-green-700 font-medium mb-2">₹{item.price}</p>

            <div className="flex flex-wrap gap-2 mt-2">
              {item.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
