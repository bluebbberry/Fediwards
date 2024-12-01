import { createRestAPIClient } from "masto";

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

const status = await masto.v1.statuses.create({
  status: "Hello from #mastojs!",
});

console.log(status.url);
