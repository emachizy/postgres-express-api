const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const { validateUser, validateUserId } = require("../middlewares/validation");

// List
router.get("/", getAllUsers);

// Read
router.get("/:id", validateUserId, getUserById);

// Create
router.post("/", validateUser, createUser);

// Update
router.put("/:id", validateUserId, validateUser, updateUser);

// Delete
router.delete("/:id", validateUserId, deleteUser);

module.exports = router;
