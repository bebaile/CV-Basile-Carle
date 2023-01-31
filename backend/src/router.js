const express = require("express");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const availabilityControllers = require("./controllers/availabilityControllers");
const messagesController = require("./controllers/messagesControllers");

const router = express.Router();

router.get("/availability", availabilityControllers.browse);

router.get("/users", userControllers.browse);
router.post("/users/create", userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.put("/users/:id", userControllers.edit);
router.post("/auth", authControllers.session);
router.post("/logout", authControllers.logout);
router.post("/availability", availabilityControllers.add);
router.delete("/availability/:id", availabilityControllers.destroy);
router.post("/messages", messagesController.add);

module.exports = router;

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
