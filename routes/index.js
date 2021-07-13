var express = require('express');
var router = express.Router();

 
const chapter = require('./chapter'); //chapter Route
router.use('/chapter', chapter);
module.exports = router;