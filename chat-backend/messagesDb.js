const fs = require('fs');
const {nanoid} = require("nanoid");

const fileName = './db.json';
let messages = [];

module.exports = {
    init() {
        try{
            const fileContents = fs.readFileSync(fileName);
            messages = JSON.parse(fileContents);
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
        this.save();
    },
    save() {
        fs.writeFileSync(fileName, JSON.stringify(messages));
    }
}

