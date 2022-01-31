const express = require('express');
const db = require('../messagesDb');
const router = express.Router();

router.get('/', (req, res) => {
    const messages = db.getMessages();
    if(messages.length > 30){
        return res.send(messages.slice(messages.length - 30, messages.length));
    }else{
        return  res.send(messages);
    }
});

router.get(`/?datetime=`, (req, res) => {
    const messages = db.getMessages();
    messages.forEach(message => {
        if(message.datetime === req.body.datetime){
            return res.send(messages[messages - 1].datetime);
        } else if(isNaN(req.body.datetime.getDate())){
            return res.status(400).send({message: 'Date is incorrect'});
        }
    })
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