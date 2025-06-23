require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/users");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/users", userRoutes);

// Central error handling
app.use(errorHandler);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    message: `The requested path ${req.path} does not exist`,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📊 PostgreSQL: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );
});
