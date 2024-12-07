import express from "express";
import * as Config from "../configs/config.js";

const router = express.Router();

router.get("/", async (request, response) => {
    response.status(200).json({ requestBody: {
        url: Config.URL,
        accountName: Config.ACCOUNT_NAME,
        imgUrl: "my-image.png"
    } });
});

export default router;
