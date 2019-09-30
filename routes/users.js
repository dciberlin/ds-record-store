const express = require("express");
const router = express.Router();
const { userValidationRules, validate } = require("../middleware/validator");

const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser
} = require("../controllers/usersController");

router
  .route("/")
  .get(getUsers)
  .post(userValidationRules(), validate, addUser);

router
  .route("/:id")
  .get(getUser)
  .delete(deleteUser)
  .put(updateUser);

module.exports = router;
