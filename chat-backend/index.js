const express = require('express');
const db = require('./messagesDb');
const messages = require('./messageRoute/messages');
const app = express();

const port = 8000;

app.use(express.json());
app.use('/messages', messages);

db.init();

app.listen(port, () => {
    console.log('App listen on ' + port + 'port!');
})