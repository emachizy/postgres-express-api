const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error: ${err.message}`);

  // Handle specific error types
  if (err.code === "23505") {
    return res.status(409).json({
      error: "Conflict",
      message: "Email address already exists in the system",
    });
  }

  if (err.code === "22P02") {
    return res.status(400).json({
      error: "Invalid input",
      message: "Invalid ID format provided",
    });
  }

  // Generic error response
  res.status(500).json({
    error: "Server Error",
    message: "An unexpected error occurred. Please try again later.",
  });
};

module.exports = errorHandler;
