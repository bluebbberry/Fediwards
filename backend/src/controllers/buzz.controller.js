import express from "express";
import * as Config from "../configs/config.js";
import masto from "../configs/mastodonclient.js";
import { sendMsgToServerOverSidekick } from "../services/sidekick.service.js";

const router = express.Router();

// get descendants of status
router.get("/", async (request, response) => {
    response.status(200).json({ requestBody: {
        "test": "test",
    }});
});

export default router;
