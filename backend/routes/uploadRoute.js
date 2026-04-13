import express from "express";
import { extractTextFromPdf } from "../pdfService.js";

export function uploadRoute(upload) {
    const router = express.Router();

    router.post("/", upload.single("file"), async (req, res) => {
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

    return router;
}
