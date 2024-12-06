import express from "express";
import * as Config from "../configs/config.js";
import masto from "../configs/mastodonclient.js";

const router = express.Router();

async function sendMsgToServer(message, sidekick) {
    if (sidekick === 'spark') {
        message = message.toUpperCase();
        await send(message);
    } else if (sidekick === 'jea') {
        const msgSplit = splitAfterHash(message);
        if (msgSplit.length > 1 && isNumeric(msgSplit[0].substring(1))) {
            const noOfMinutes = Number(msgSplit[0].substring(1));
            const restOfMessage = msgSplit[1];
            setTimeout(() => send(restOfMessage), 1000 * noOfMinutes * 60);
        } else {
            await send(message);
        }
    } else {
        await send(message);
    }
}

// from https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

async function send(message, sidekick) {
    const status = await masto.v1.statuses.create({
        status: message,
    });
    console.log(status.url);
}

function splitAfterHash(str) {
    if (str[0] !== '#') { return [str]; }
    const msgSplit = str.split(" ");
    if (msgSplit.length <= 1) { return [str]; }
    const command = msgSplit[0];
    const restOfTheText = str.substring(command.length + 1);
    return [command, restOfTheText];
}

router.post("/", (request, response) => {
    // Send message to mastodon server
    console.log("Received message for " + request.body["sidekick"]);
    sendMsgToServer(request.body["message"], request.body["sidekick"]);
    response.sendStatus(200);
    response.end();
});

router.get("/", async (request, response) => {
    try {
        // Send message to mastodon server
        const posts = await getPosts(Config.ACCOUNT_NAME);
        response.status(200).json({ requestBody: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Function to fetch posts
async function getPosts(accountName) {
    const acct = await masto.v1.accounts.lookup({
        acct: accountName,
    });
    console.log(`ID: ${acct.id}`);
    const id = acct.id;

    let posts = await masto.v1.accounts.$select(id).statuses.list();
    const firstPost = posts[0];
    console.log(firstPost);
    posts = posts.map((status) => {
        return {
            "content": cropStatusContent(status.content),
            "id": status.id,
            "createdAt": status.createdAt
        };
    });

    return posts;
}

function cropStatusContent(statusContent) {
    return statusContent.substring(3, statusContent.length - 4);
}

router.get("/:id/children", async (request, response) => {
    try {
        // Send message to mastodon server
        const context = await getParentAndChildren(request.params.id);
        const descendants = context.descendants.map(ancestor => {
            return {
                "id": ancestor.id,
                "createdAt": ancestor.createdAt,
                "content": cropStatusContent(ancestor.content)
            };
        });
        response.status(200).json({ requestBody: descendants });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Function to fetch parent and childs of a post
async function getParentAndChildren(statusId) {
    console.log("StatusId:");
    console.log(statusId);
    let context = await masto.v1.statuses.$select(statusId).context.fetch();
    console.log("Context:");
    console.log(context);
    return context;
}

export default router;
