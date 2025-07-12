import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:4000");

const VALID_ACTIONS = ["clicked", "scrolled", "logged-in", "logged-out"];
const VALID_DEVICES = ["mobile", "desktop", "tablet"];

export default function ActivityDashboard() {
  const [activities, setActivities] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    action: "",
    device: "",
    screen: ""
  });

  useEffect(() => {
    const handleInit = (data) => {
      const uniqueMap = new Map();
      [...data].reverse().forEach((act) => {
        uniqueMap.set(act.userId, act);
      });
      const uniqueActivities = Array.from(uniqueMap.values()).reverse();
      setActivities(uniqueActivities);
    };

    const handleNew = (activity) => {
      setActivities((prev) => {
        const filtered = prev.filter((a) => a.userId !== activity.userId);
        return [activity, ...filtered];
      });
    };

    socket.on("init", handleInit);
    socket.on("new-activity", handleNew);

    return () => {
      socket.off("init", handleInit);
      socket.off("new-activity", handleNew);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userIdInt = parseInt(form.userId);
   if (!form.userId || isNaN(userIdInt)) {
    return alert("❌ Please enter a valid numeric user ID.");
  }

  if (activities.some((a) => a.userId === userIdInt)) {
    return alert("❌ User ID already exists. Please enter a unique user ID.");
  }

  if (!VALID_ACTIONS.includes(form.action)) {
    return alert("❌ Invalid action. Please select a valid one.");
  }

  if (!VALID_DEVICES.includes(form.device)) {
    return alert("❌ Invalid device. Please select from the list.");
  }

  try {
    await axios.post("http://localhost:4000/activity", {
      ...form,
      userId: userIdInt
    });
    setForm({ userId: "", action: "", device: "", screen: "" });
  } catch (err) {
    alert("❌ Failed to send activity. Check console.");
    console.error(err);
  }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
          Real-Time User Activity Tracker
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "30px" }}>
        <input
          type="text"
          name="userId"
          placeholder="User ID (numeric)"
          value={form.userId}
          onChange={handleChange}
          style={{ padding: "10px", width: "150px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <select
          name="action"
          value={form.action}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="">Select Action</option>
          {VALID_ACTIONS.map((action, i) => (
            <option key={i} value={action}>{action}</option>
          ))}
        </select>

        <select
          name="device"
          value={form.device}
          onChange={handleChange}
          style={{ padding: "10px", width: "180px", borderRadius: "6px", border: "1px solid #ccc" }}
        >
          <option value="">Select Device</option>
          {VALID_DEVICES.map((device, i) => (
            <option key={i} value={device}>{device}</option>
          ))}
        </select>

        <input
          type="text"
          name="screen"
          placeholder="Screen (e.g., Login, Dashboard)"
          value={form.screen}
          onChange={handleChange}
          style={{ padding: "10px", width: "200px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}
        >
          Submit
        </button>
      </form>

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {activities.map((act, index) => {
          const formattedTime = new Date(act.timestamp).toLocaleString();
          const deviceIcon = act.device === "mobile" ? "📱" : act.device === "desktop" ? "🖥️" : act.device === "tablet" ? "💻" : "❔";
          const screenValue = act.screen ? act.screen.charAt(0).toUpperCase() + act.screen.slice(1) : "-";
          const deviceValue = act.device ? act.device.charAt(0).toUpperCase() + act.device.slice(1) : "-";

          return (
            <div key={index} style={{ padding: "10px", borderBottom: "1px solid #e0e0e0" }}>
              <strong style={{ color: "#007bff" }}>{act.userId}</strong> ➤ {" "}
              <em style={{ color: "#555" }}>{act.action}</em> 🕒 {" "}
              <span style={{ color: "#888" }}>{formattedTime}</span>
              <div style={{ fontSize: "0.85rem", color: "#999", marginTop: "4px" }}>
                {deviceIcon} Device: {deviceValue} | 🧭 Screen: {screenValue}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
