import {createRestAPIClient} from "masto";
import express from 'express';
import cors from "cors";

const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('Expected at least two arguments!');
  process.exit(1);
}

const URL = args[0];
const TOKEN = args[1];

const masto = createRestAPIClient({
  url: URL,
  accessToken: TOKEN,
});

// ============== REST API ===================
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

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

app.post("/status", (request, response) => {
    // Send message to mastodon server
    console.log("Received message for " + request.body["sidekick"]);
    sendMsgToServer(request.body["message"], request.body["sidekick"]);
    response.sendStatus(200);
    response.end();
});

app.get("/statuses", async (request, response) => {
    try {
        // Send message to mastodon server
        const posts = await getPosts("bluebbberry");
        response.status(200).json({ requestBody: posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        response.status(500).json({ error: "Failed to fetch posts" });
    }
});

// Function to fetch posts
async function getPosts(account) {
    const acct = await masto.v1.accounts.lookup({
        acct: '@bluebbberry@mastodon.social',
    });
    console.log(`ID: ${acct.id}`);
    const id = acct.id;

    let posts = await masto.v1.accounts.$select(id).statuses.list();
    posts = posts.map((status) => {
        return {"content": status.content};
    });
    return posts;
}
