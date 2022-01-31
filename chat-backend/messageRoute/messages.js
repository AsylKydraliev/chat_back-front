const express = require('express');
const db = require('../messagesDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = db.getMessages();
    const date = new Date(req.query.datetime);

    if(req.query.datetime){
        if(isNaN(date.getDate())){
            return res.status(400).send({message: 'Incorrect date'});
        } else {
            const index = messages.findIndex(message => message.datetime === req.query.datetime);
            return res.send(messages.slice(index + 1, messages.length));
        }
    }else{
        if(messages.length > 30){
            return res.send(messages.slice(messages.length - 30, messages.length));
        }else {
            res.send(messages);
        }
    }
});

router.post('/', async (req, res, next) => {
   try{
       if(!req.body.message || !req.body.author){
           return res.status(400).send({message: 'Author and message are required'});
       }else{
           const message = {
               message: req.body.message,
               author: req.body.author,
               datetime: new Date().toISOString()
           }
           await db.addMessage(message);
           return res.send({message: 'Create new message by id: ' + message.id});
       }
   }catch (e) {
       next(e);
   }
});

module.exports = router;