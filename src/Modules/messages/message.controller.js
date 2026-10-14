import { Router } from "express";
import { messageServiceStatus } from "./message.service.js";

const router = Router();

router.get("/health", (req, res) => {
    res.status(200).json(messageServiceStatus());
});

export default router;
