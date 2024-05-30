const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|index(.html)?', (req, res) => {
    res.send('index');
});

module.exports = router;
