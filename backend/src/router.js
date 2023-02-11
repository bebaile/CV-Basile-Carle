const express = require("express");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const availabilityControllers = require("./controllers/availabilityControllers");
const messagesController = require("./controllers/messagesControllers");
const apointmentController = require("./controllers/apointmentControllers");
const { userExist, checkAdmin } = require("./helpers/auth");

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
router.post("/availability", availabilityControllers.add);

// routes à sécuriser utilisateur
router.get("/messages/", messagesController.browse);

// routes sécurisées Admin
router.get("/auth/admin", checkAdmin, authControllers.admin);
router.delete("/users/:id", checkAdmin, userControllers.destroy);
router.get("/users", checkAdmin, userControllers.browse);
router.put("/users/:id", checkAdmin, userControllers.edit);
router.delete("/availability/:id", checkAdmin, availabilityControllers.destroy);
router.get("/apointment", checkAdmin, apointmentController.browse);

module.exports = router;
