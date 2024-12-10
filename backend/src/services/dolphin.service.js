// name: message
let knowledgeBase = {};

function addToKnowledgeBase(username, message) {
    if (knowledgeBase[username]) {
        knowledgeBase[username].push(message);
    } else {
        knowledgeBase[username] = [];
    }
}

export {
    addToKnowledgeBase,
    knowledgeBase
};
