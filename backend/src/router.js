const express = require("express");
const userControllers = require("./controllers/userControllers");
const authControllers = require("./controllers/authControllers");
const availabilityControllers = require("./controllers/availabilityControllers");
const messagesControllers = require("./controllers/messagesControllers");
const apointmentControllers = require("./controllers/apointmentControllers");
const { userExist, checkAdmin, checkUser } = require("./helpers/auth");

const router = express.Router();

// routes non sécurisées
router.get("/availability", availabilityControllers.browse);
router.get("/availability/:id", availabilityControllers.read);
router.get("/users/check/:id", userControllers.checkUserExist);
router.post("/users/create", userExist, userControllers.add);
router.post("/auth", authControllers.session);
router.post("/logout", authControllers.logout);
router.post("/messages", messagesControllers.add);
router.post("/apointment", apointmentControllers.add);
router.post("/availability", availabilityControllers.add);
router.get("/apointment/:id", apointmentControllers.read);

// routes sécurisée utilisateur
router.get("/messages/:id", checkUser, messagesControllers.read);

// routes sécurisées Admin
router.get("/auth/admin", checkAdmin, authControllers.admin);
router.delete("/users/:id", checkAdmin, userControllers.destroy);
router.get("/users", checkAdmin, userControllers.browse);
router.put("/users/:id", checkAdmin, userControllers.edit);
router.delete("/availability/:id", checkAdmin, availabilityControllers.destroy);
router.get("/apointment", checkAdmin, apointmentControllers.browse);
router.get("/messages/", checkAdmin, messagesControllers.browse);

module.exports = router;
