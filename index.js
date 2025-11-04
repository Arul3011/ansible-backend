const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const todoRoutes = require("./routes/todoroute");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Check if .env variables loaded properly
if (!process.env.MONGO_URI) {
  console.error("❌ Missing MONGO_URI in .env file");
  process.exit(1); // Stop server if DB string missing
}

// Routes
app.use("/api/todos", todoRoutes);
app.get("/", (req, res) => {  
  res.send("Welcome to the Todo API");
})

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  });

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
