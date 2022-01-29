const express = require('express');
const messages = require('./messageRoute/messages');
const app = express();
const port = 8000;

app.use('messages', messages);

app.listen(port, () => {
    console.log('App listen on ' + port + 'port!');
})