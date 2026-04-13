import express from "express";
import { generateSummary } from "../openaiClient.js";

export function summaryRoute(client) {
    const router = express.Router();

    router.post("/", async (req, res) => {
        try {
            const { text, length = "medium" } = req.body;
            if (!text) {
                return res.status(400).json({ error: "Missing document text." });
            }

            const summary = await generateSummary(client, text, length);
            res.json({ summary });
        } catch (error) {
            console.error("Summary error:", error);
            res.status(500).json({ error: "Failed to generate summary." });
        }
    });

    return router;
}
