import jwt from "jsonwebtoken";
import { config } from "../config.js";

export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

    if (!token) {
        return res.status(401).json({ error: "Missing or invalid authorization token." });
    }

    try {
        const payload = jwt.verify(token, config.authJwtSecret);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Invalid or expired token." });
    }
}
