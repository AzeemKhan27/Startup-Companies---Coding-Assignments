import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { storeActivity, getAllActivities, VALID_ACTIONS  } from "./utils/activityStore.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("🟢 New client connected:", socket.id);
  socket.emit("init", getAllActivities());

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

const VALID_DEVICES = ["mobile", "desktop", "tablet"];
const VALID_ACTIONS = ["clicked", "scrolled", "logged-in", "logged-out"];

app.post("/activity", (req, res) => {
  const { userId, action, device, screen } = req.body;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }

  if (!VALID_ACTIONS.includes(action)) {
    return res.status(400).json({ message: "Invalid action" });
  }

  if (!VALID_DEVICES.includes(device)) {
    return res.status(400).json({ message: "Invalid device" });
  }

  const entry = storeActivity({ userId, action, device, screen });
  io.emit("new-activity", entry);
  res.json({ message: "Activity stored", data: entry });
});


const PORT = 4000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
