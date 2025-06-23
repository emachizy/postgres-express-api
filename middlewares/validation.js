const validateUser = (req, res, next) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Name and email are required fields",
    });
  }

  if (req.method === "POST" && !name.trim()) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Name cannot be empty",
    });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Invalid email format",
    });
  }

  next();
};

module.exports = { validateUser };
