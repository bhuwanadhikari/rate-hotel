const express = require('express');
const router = express.Router();

//LECTURERS
router.get('/test', (req, res) => res.json({msg: 'lecturers works'}));

module.exports = router;