import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { createAIClient, generateSummary, answerQuestion } from "./openaiClient.js";
import { extractTextFromPdf } from "./pdfService.js";

dotenv.config();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const PORT = process.env.PORT || 4000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("Missing OPENAI_API_KEY in environment variables.");
    process.exit(1);
}

const aiClient = createAIClient(OPENAI_API_KEY);

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/upload", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ error: "Missing file upload." });
        }

        const { text, info } = await extractTextFromPdf(file.buffer);
        res.json({ text, info });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to extract text from PDF." });
    }
});

app.post("/summary", async (req, res) => {
    try {
        const { text, length = "medium" } = req.body;
        if (!text) {
            return res.status(400).json({ error: "Missing document text." });
        }

        const summary = await generateSummary(aiClient, text, length);
        res.json({ summary });
    } catch (error) {
        console.error("Summary error:", error);
        res.status(500).json({ error: "Failed to generate summary." });
    }
});

app.post("/qa", async (req, res) => {
    try {
        const { text, question } = req.body;
        if (!text || !question) {
            return res.status(400).json({ error: "Missing text or question." });
        }

        const answer = await answerQuestion(aiClient, text, question);
        res.json({ answer });
    } catch (error) {
        console.error("QA error:", error);
        res.status(500).json({ error: "Failed to answer question." });
    }
});

app.listen(PORT, () => {
    console.log(`AI-Pdf-Helper backend listening at http://localhost:${PORT}`);
});
