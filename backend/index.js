import { createRestAPIClient } from "masto";
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
    }

    const status = await masto.v1.statuses.create({
       status: message,
    });
    console.log(status.url);
}

app.post("/status", (request, response) => {
   // Send message to mastodon server
    console.log(request.body);
   sendMsgToServer(request.body["message"], request.body["sidekick"]);
   response.sendStatus(200);
   response.end();
});
