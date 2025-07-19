const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const locationRoutes = require("./routes/locationRoutes");
const assetRoutes = require("./routes/assetRoutes");

// Swagger setup
const { swaggerUi, swaggerSpec } = require("./config/swagger");

dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(cors({
  origin: [
    'https://stocksphere-backend-y74h.onrender.com',
    'http://localhost:3000',  // For local development
    'http://localhost:5000'   // For local development
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}));

// Logging based on environment
app.use(morgan(process.env.NODE_ENV === "development" ? "dev" : "combined"));

// Middlewares
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Stocksphere Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/assets", assetRoutes);
app.use('/api/location', locationRoutes);

// Swagger Docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

// Server startup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Graceful shutdown for unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Promise Rejection:", err.message);
  server.close(() => process.exit(1));
});
