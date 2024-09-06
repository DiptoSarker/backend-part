// server.js or app.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// Initialize app
const app = express();
dotenv.config(); // Load environment variables from .env file

// Middleware
app.use(express.json()); // For parsing JSON requests
app.use(cors()); // To enable cross-origin requests
app.use(morgan("combined")); // Use Morgan for logging HTTP requests

// Routes
const customerRoutes = require("./routes/customers");
const adminRoutes = require("./routes/admin");
app.use("/api/customers", customerRoutes);
app.use("/api/admin", adminRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//diptosarker802
//vdX7SuK74uIMBBhY
