import express from "express";
import cors from "cors";
import multer from "multer";
import { createAIClient } from "./openaiClient.js";
import { healthRoute } from "./routes/healthRoute.js";
import { authRoute } from "./routes/authRoute.js";
import { uploadRoute } from "./routes/uploadRoute.js";
import { summaryRoute } from "./routes/summaryRoute.js";
import { qaRoute } from "./routes/qaRoute.js";
import { requireAuth } from "./middleware/auth.js";
import { config, validateConfig } from "./config.js";

validateConfig();

const app = express();
const upload = multer({ storage: multer.memoryStorage() });
const aiClient = createAIClient();

app.use(cors({ origin: true }));
app.use(express.json());

app.use("/auth", authRoute());
app.use("/health", healthRoute());
app.use("/upload", requireAuth, uploadRoute(upload));
app.use("/summary", requireAuth, summaryRoute(aiClient));
app.use("/qa", requireAuth, qaRoute(aiClient));

app.listen(config.port, () => {
    console.log(`AI-Pdf-Helper backend listening at http://localhost:${config.port}`);
});
