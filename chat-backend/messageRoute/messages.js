const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('All messages');
})

router.post('/', (req, res) => {
    res.send('Create new message');
})

module.exports = router;