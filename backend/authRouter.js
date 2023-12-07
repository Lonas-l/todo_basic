const Router = require("express");
const router = new Router();
const controller = require("./authController");
const {check} = require("express-validator");
const authMiddleware = require("./middlewaree/authMiddleware");

router.post("/registration", [
    check("username", "The user's name cannot be empty.").notEmpty(),
    check("password", "Password should be more than 4 and less than 10 characters").isLength({min: 4, max: 32})
], controller.registration);
router.post("/login", controller.login);
router.get("/client", controller.getUsers);
router.get("/clients/:clientId/todos", controller.getClientTodos);
router.put("/updatetodos", authMiddleware, controller.updatetodos);
router.get("/gettodos", authMiddleware, controller.gettodos);

module.exports = router;
