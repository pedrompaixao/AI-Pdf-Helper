import express from "express";

export function healthRoute() {
    const router = express.Router();

    router.get("/", (req, res) => {
        res.json({ status: "ok" });
    });

    return router;
}
