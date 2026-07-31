const menuRoutes = require("./routes/menuRoutes");
const contactRoutes = require("./routes/contactRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
console.log(process.env.MONGO_URI);
const connectDB = require("./config/db");


// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/reservations", reservationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/menu", menuRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("🚀 Bistro Bloom Backend is Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});