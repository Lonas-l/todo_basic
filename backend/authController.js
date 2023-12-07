const User = require("./models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult} = require("express-validator");
const {secret} = require("./config");

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    };
    return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Registration error", errors});
            }
            const {username, password} = req.body;
            const candidate = await User.findOne({username});
            if (candidate) {
                return res.status(400).json({message: "User with this name already exist"});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({username, password: hashPassword, todos: null});
            await user.save();
            return res.json({message: "User successfully registered"});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Registration error"});
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body;
            const user = await User.findOne({username});
            if (!user) {
                return res.status(400).json({message: `User ${username} did not find`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Incorrect password`});
            }
            const token = generateAccessToken(user._id, user.roles);
            return res.json({token});
        } catch (e) {
            console.log(e);
            res.status(400).json({message: "Login error"});
        }
    }

    async getClientTodos(req, res) {
        try {
            const clientId = req.params.clientId;
            const client = await User.findById(clientId, "username todos");
            if (!client) {
                return res.status(404).json({message: "Client not found"});
            }
            res.json(client.todos);
        } catch (e) {
            console.log(e);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }

    async updatetodos(req, res) {
        try {
            const userId = req.user.id;
            const userSettings = req.body;
            const currentUser = await User.findById(userId);
            if (currentUser) {
                currentUser.todos = userSettings;
            }
            await currentUser.save();
            res.json({message: "Settings successfully updated"});

        } catch (error) {
            console.error("Error updating timer settings: ", error);
            res.status(500).json({message: "Error updating timer settings"});
        }
    }

    async gettodos(req, res) {
        try {
            const currentUser = await User.findById(req.user.id);
            if (!currentUser) {
                return res.status(404).json({message: "User doesn't find"});
            }
            const todos = currentUser.todos;
            res.json(todos);
        } catch (error) {
            console.error("Error updating timer settings: ", error);
            res.status(500).json({message: "Error updating timer settings"});
        }
    }
}

module.exports = new authController();
