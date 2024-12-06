import masto from "../configs/mastodonclient.js";

export async function sendMsgToServerOverSidekick(message, sidekick) {
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

async function send(message) {
    const status = await masto.v1.statuses.create({
        status: message,
    });
    console.log(status.url);
}

// from https://stackoverflow.com/questions/175739/how-can-i-check-if-a-string-is-a-valid-number
function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

function splitAfterHash(str) {
    if (str[0] !== '#') { return [str]; }
    const msgSplit = str.split(" ");
    if (msgSplit.length <= 1) { return [str]; }
    const command = msgSplit[0];
    const restOfTheText = str.substring(command.length + 1);
    return [command, restOfTheText];
}
