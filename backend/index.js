import { createRestAPIClient } from "masto";
import express from 'express';

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

//const status = await masto.v1.statuses.create({
//  status: "Hello from #mastojs!",
//});

// ============== REST API ===================
const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});

async function sendMsgToServer() {
    const status = await masto.v1.statuses.create({
       status: "Hello from #mastojs!",
    });
    console.log(status.url);
}

app.get("/status", (request, response) => {
   // Send message to mastodon server
   sendMsgToServer();
   response.header("Access-Control-Allow-Origin", "*");
   response.sendStatus(200);
   response.end();
});
