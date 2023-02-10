const express = require("express");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const availabilityControllers = require("./controllers/availabilityControllers");
const messagesController = require("./controllers/messagesControllers");
const apointmentController = require("./controllers/apointmentControllers");
const { userExist } = require("./helpers/auth");

const router = express.Router();

// routes non sécurisées
router.get("/availability", availabilityControllers.browse);
router.get("/availability/:id", availabilityControllers.read);
router.get("/users/check/:id", userControllers.checkUserExist);
router.post("/users/create", userExist, userControllers.add);
router.post("/auth", authControllers.session);
router.post("/logout", authControllers.logout);
router.post("/messages", messagesController.add);
router.post("/apointment", apointmentController.add);

// routes sécurisées

router.get("/users", userControllers.browse);
router.delete("/users/:id", userControllers.destroy);
router.put("/users/:id", userControllers.edit);
router.post("/availability", availabilityControllers.add);
router.delete("/availability/:id", availabilityControllers.destroy);
router.get("/messages/", messagesController.browse);
router.get("/apointment", apointmentController.browse);

module.exports = router;

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
