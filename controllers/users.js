const db = require("../db");

// GET /users
const getAllUsers = async (req, res, next) => {
  try {
    const { rows } = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error("Error fetching users:", err.message);
    next(err);
  }
};

// GET /users/:id
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
};

// POST /users
const createUser = async (req, res, next) => {
  try {
    const { name, email, age } = req.body;
    const { rows } = await db.query(
      `INSERT INTO users (name, email, age)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, email, age]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error("Error creating user:", err.message);
    next(err);
  }
};

// PUT /users/:id
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const { rows } = await db.query(
      `UPDATE users
       SET name  = $1,
           email = $2,
           age   = $3
       WHERE id = $4
       RETURNING *`,
      [name, email, age, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error updating user:", err.message);
    next(err);
  }
};

// DELETE /users/:id
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await db.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        message: `User with ID ${id} does not exist`,
      });
    }

    res.json({ message: `User with ID ${id} deleted successfully` });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
