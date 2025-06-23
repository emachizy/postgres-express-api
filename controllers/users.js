const db = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({
      error: "Database Error",
      message: "Failed to retrieve user data",
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Other CRUD operations with similar error handling...
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await db.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err.message);
    res
      .status(500)
      .json({ error: "Database Error", message: "Failed to create user" });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const result = await db.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating user:", err.message);
    res
      .status(500)
      .json({ error: "Database Error", message: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res
      .status(500)
      .json({ error: "Database Error", message: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
