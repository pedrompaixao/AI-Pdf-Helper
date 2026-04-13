import express from "express";
import { answerQuestion } from "../openaiClient.js";

export function qaRoute(client) {
    const router = express.Router();

    router.post("/", async (req, res) => {
        try {
            const { text, question } = req.body;
            if (!text || !question) {
                return res.status(400).json({ error: "Missing text or question." });
            }

            const answer = await answerQuestion(client, text, question);
            res.json({ answer });
        } catch (error) {
            console.error("QA error:", error);
            res.status(500).json({ error: "Failed to answer question." });
        }
    });

    return router;
}
