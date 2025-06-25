require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");
const db = require("./db"); // Make sure this exports a `pg.Pool` or client

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Central error handler
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The requested path ${req.path} does not exist`,
  });
});

// Database connection check before starting the server
async function testDbConnection() {
  try {
    await db.query("SELECT 1");
    console.log("✅ Connected to the PostgreSQL database successfully.");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  }
}

// Graceful shutdown
function shutdown() {
  console.log("\n🛑 Gracefully shutting down...");
  if (db.end) {
    db.end(() => {
      console.log("🧹 PostgreSQL connection closed.");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// Start server after DB check
testDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(
      `📊 PostgreSQL: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
    );
  });
});
