import express from "express";
import jwt from "jsonwebtoken";
import { config } from "../config.js";
import { getUserByEmail, createUser, validateUserCredentials } from "../services/userService.js";

export function authRoute() {
    const router = express.Router();

    router.post("/signup", (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        if (getUserByEmail(email)) {
            return res.status(409).json({ error: "User with this email already exists." });
        }

        const user = createUser(email, password);
        if (!user) {
            return res.status(400).json({ error: "Failed to create user." });
        }

        const token = jwt.sign({ email }, config.authJwtSecret, {
            expiresIn: config.authTokenExpiry,
        });

        res.status(201).json({
            token,
            user: {
                email,
            },
        });
    });

    router.post("/login", (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        const user = validateUserCredentials(email, password);
        if (!user && (email !== config.authUserEmail || password !== config.authUserPassword)) {
            return res.status(401).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ email }, config.authJwtSecret, {
            expiresIn: config.authTokenExpiry,
        });

        res.json({
            token,
            user: {
                email,
            },
        });
    });

    return router;
}
