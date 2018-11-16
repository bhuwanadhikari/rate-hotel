const express = require('express');
const router = express.Router();

//USER
router.get('/test', (req, res) => res.json({msg: 'user works'}));

module.exports = router;