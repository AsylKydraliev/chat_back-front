const fs = require('fs').promises;
const {nanoid} = require("nanoid");

const fileName = './db.json';
let messages = [];

module.exports = {
    async init() {
        try{
            const fileContents = await fs.readFile(fileName);
            messages = JSON.parse(fileContents.toString());
            console.log(messages);
        }catch (e) {
            messages = [];
        }
    },
    getMessages() {
        return messages;
    },
    addMessage(message) {
        message.id = nanoid();
        messages.push(message);
        return this.save();
    },
    save() {
        return fs.writeFile(fileName, JSON.stringify(messages));
    }
}

