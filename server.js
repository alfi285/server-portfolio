const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes.js");

dotenv.config();
const app = express();



app.use(
  cors({
    origin: "https://client-portfolio-sigma-liard.vercel.app", // ✅ Your Vercel frontend domain
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);


// Middleware
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);

// DB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
