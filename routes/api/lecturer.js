const express = require('express');
const router = express.Router();

//LECTURER
router.get('/test', (req, res) => res.json({msg: 'lecturer works'}));

module.exports = router;