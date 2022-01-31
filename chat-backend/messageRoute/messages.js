const express = require('express');
const db = require('../messagesDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = db.getMessages();
    return res.send(messages);
})

router.post('/', (req, res) => {
    const message = {
        message: req.body.message,
        author: req.body.author,
        datetime: new Date().toISOString()
    }

    db.addMessage(message);

    return res.send({message: 'Create new message by id: ' + message.id});
})

module.exports = router;