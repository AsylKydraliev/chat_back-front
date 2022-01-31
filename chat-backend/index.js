const express = require('express');
const db = require('./messagesDb');
const cors = require('cors');
const messages = require('./messageRoute/messages');
const app = express();

const port = 8000;

app.use(cors({origin: 'http://localhost:4200'}));
app.use(express.json());
app.use('/messages', messages);

db.init();

app.listen(port, () => {
    console.log('App listen on ' + port + 'port!');
})