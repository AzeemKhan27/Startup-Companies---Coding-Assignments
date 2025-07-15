# 🛒 React Product Search App

A simple React-based product search interface using `dummyjson.com` API.

---

### 🚀 Features

- 🔍 Live product search by title
- 🖼️ Product cards with thumbnail, title, category, price, and tags
- 💾 State persists on refresh via `localStorage`
- ⚛️ React Hooks: `useState`, `useEffect`
- ⚡ Built with Vite + Axios

---

### 🛠️ Tech Stack

- React
- Vite
- Axios
- Tailwind CSS (optional)

---

### 📦 API Used

```
https://dummyjson.com/products
```

---

### 📁 Project Structure

```
/src
  └── App.jsx
  └── main.jsx
public/
index.html
package.json
```

---

### 📸 Preview

```
Product Card Example:
----------------------
📷 Thumbnail
📦 Category: mobile-accessories
🔤 Title: Apple iPhone Charger
💰 ₹19.99
🏷️ #electronics #chargers
```

---

### 🧠 Code Highlights

#### ✅ State Initialization

```js
const [query, setQuery] = useState(() => localStorage.getItem('query') || '');
const [products, setProducts] = useState(() => {
  const saved = localStorage.getItem('products');
  return saved ? JSON.parse(saved) : [];
});
```

#### ✅ Data Fetch + Filter

```js
useEffect(() => {
  if (query.trim() === '') return;

  const fetchData = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    const filtered = res.data.products.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setProducts(filtered);
    localStorage.setItem('query', query);
    localStorage.setItem('products', JSON.stringify(filtered));
  };

  fetchData();
}, [query]);
```

#### ✅ UI Rendering

```jsx
{products.map((item) => (
  <div key={item.id}>
    <img src={item.thumbnail} alt={item.title} />
    <h2>{item.title}</h2>
    <p>Category: {item.category}</p>
    <p>₹{item.price}</p>
    <div>
      {item.tags?.map((tag, i) => (
        <span key={i}>#{tag} </span>
      ))}
    </div>
  </div>
))}
```

---

### ⚙️ How to Run

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Visit: `http://localhost:5173`

---

### 📌 Improvements To Add Later

- Debounced search
- Modal for product details
- Sort & filter
- Pagination
- Redux or Context API

---

### 👤 Author

**Azeem Khan**  
Experienced React + Node.js Developer

- 🌐 [GitHub](https://github.com/AzeemKhan27/Startup-Companies---Coding-Assignments)  
- 💼 [LinkedIn](https://www.linkedin.com/in/azeem-khan-5a9717171/)   
- ⚡ Made with ❤️ using [Vite](https://vitejs.dev/)

---

### 📄 License

This project is open source and available under the MIT License.
