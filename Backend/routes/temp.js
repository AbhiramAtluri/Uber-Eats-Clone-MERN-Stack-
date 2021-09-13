var express = require('express');
var router = express.Router();
var reg = require('../models/authentication')

/* GET users listing. */
router.post('/resreg', reg.restregister);
router.post('/resprof',reg.resterauntProfile)
router.get('/reslog',reg.resterauntLogin)



module.exports = router;
