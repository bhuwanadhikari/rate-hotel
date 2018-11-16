const express = require('express');
const router = express.Router();

//USERS
router.get('/test', (req, res) => res.json({msg: 'users works'}));

module.exports = router;