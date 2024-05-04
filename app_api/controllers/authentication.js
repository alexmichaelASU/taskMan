const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users');

async function register(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ "message": "All fields required" });
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Email has already been used" });
        }

        const user = new User({
            email: req.body.email,
            name: req.body.name, 
        });

        
        user.setPassword(req.body.password);
        await user.save();

        const token = user.generateJwt();
        
        return res
            .status(200)
            .json({ token });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json(err);
    }
}



const login = async (req, res) => {
    console.log("Received request:", req.body);

    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ message: "All fields required" });
    }

    try {
        // Authenticate the user with the 'local' strategy
        const authenticateUser = (req, res) => new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    reject(err);
                }
                if (user) {
                    resolve(user);
                } else {
                    reject(info);
                }
            })(req, res);
        });

        const user = await authenticateUser(req, res);

        const token = user.generateJwt();
        console.log(token);

        return res.status(200).json({ token });
    } catch (err) {
        console.error("Error:", err);
        if (err.message === "Unauthorized") {
            return res.status(401).json(err);
        } else {
            return res.status(404).json(err);
        }
    }
};

async function getUser(req, res) {
    try {
        const user = await User.findOne({ email: req.params.email });
        
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: "No user found" });
        }
    } catch (error) {
        res.status(404).json({ message: "Error retrieving user", error });
    }
}

async function getUserNameByEmail(req, res) {
    try {
        const user = await User.findOne({ email: req.params.email });
        
        if (user) {
            res.status(200).json({ name: user.name });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


module.exports = {
    getUser,
    register,
    login,
    getUserNameByEmail
};