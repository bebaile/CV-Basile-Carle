const express = require("express");
const userControllers = require("./controllers/userControllers");

const router = express.Router();

router.get("/users", userControllers.browse);
router.post("/users", userControllers.add);

module.exports = router;

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);
