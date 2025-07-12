# 📊 Real-Time User Activity Tracker (Fullstack Assignment)

A fullstack project built using **Node.js + Express + Socket.IO (WebSocket)** on the backend and **React.js (Vite)** on the frontend. It tracks user actions in real-time and updates a live dashboard using WebSocket communication.

---

## Live Demo

> _Coming soon_  
> Or run locally: `http://localhost:5173`

---

## 📌 Features

- Real-time user activity dashboard 🔁
- WebSocket (Socket.IO) integration 🔌
- Submit user actions from UI form 🧾
- Instant activity broadcast 📡
- Validation: numeric userId, predefined actions, valid device types ✅
- Duplicate userId prevention in UI ❌
- Clean and minimal responsive UI ✨

---

## 🧱 Tech Stack

| Layer     | Tech                          |
|-----------|-------------------------------|
| Frontend  | React.js (Vite), Socket.IO-client, Axios |
| Backend   | Node.js, Express.js, Socket.IO |
| Testing   | Postman                       |
| Styling   | Inline CSS (for demo)         |

---

## 🧠 System Design

```
[React Form] ---> [POST /activity] ---> [Express Backend]
       ⬇                                 ⬇
  [WebSocket Listener] <--- io.emit("new-activity")
       ⬆                                 ⬆
[Activity Dashboard] <---- socket.on() <--- [Memory Store]
```

---

## 🗃️ Folder Structure

```
realtime-user-tracker/
├── backend/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── vite.config.js
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       └── components/
│           └── ActivityDashboard.jsx
├── README.md
```

---

## ⚙️ Backend Setup

```bash
cd backend
npm install
node server.js
```

### ✅ Backend Runs on: `http://localhost:4000`

---

## ⚛️ Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

### ✅ Frontend on: `http://localhost:5173`

---

## 🧪 Test API Using Postman

**POST** `http://localhost:4000/activity`  
**Body (JSON):**
```json
{
  "userId": 123,
  "action": "clicked",
  "device": "desktop",
  "screen": "dashboard"
}
```

### 🔁 Valid Action List:
- `"clicked"`
- `"scrolled"`
- `"logged-in"`
- `"logged-out"`

### 📱 Valid Device List:
- `"mobile"`
- `"desktop"`
- `"tablet"`

---

## 🎓 How It Works

1. User enters activity via form in React UI
2. Form input is validated (action, device, userId uniqueness)
3. Request sent to backend (`POST /activity`)
4. Backend validates again and stores the activity in memory
5. Socket.IO broadcasts activity to all connected clients
6. Dashboard updates instantly with latest info per user

---

## ⚠️ Validations Handled

| Field     | Validation Type                        |
|-----------|----------------------------------------|
| userId    | Must be numeric & unique in dashboard  |
| action    | Must be from allowed values            |
| device    | Must be \"mobile\", \"desktop\", or \"tablet\" |
| screen    | Optional (shown if entered)            |

---

## 🚫 Prevents

- ❌ Submitting same userId twice
- ❌ Invalid actions/devices
- ❌ Empty or invalid userId

---

## 🛠️ Future Improvements

- Add MongoDB for persistent log storage
- Filter logs by action/device
- Add charts/analytics using Chart.js
- Use Material UI or Tailwind CSS for better design
- User login & history

---

## 👨‍💻 Author

> Built with ❤️ by **Azeem Khan**  
> GitHub: [github.com/my-profile](https://github.com/AzeemKhan27)

---

## 📄 License

MIT License

