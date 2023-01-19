const express = require("express");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");

const router = express.Router();

router.get("/users", userControllers.browse);
router.post("/users/create", userControllers.add);
router.post("/auth", authControllers.session);
router.post("/logout", authControllers.logout);

module.exports = router;

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
