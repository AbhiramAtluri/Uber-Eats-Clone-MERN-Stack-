var express = require('express');
var router = express.Router();
var auth = require('../models/authentication')

/* GET users listing. */
router.post('/resreg', auth.restregister);
router.post('/resprof',auth.resterauntProfile)
router.post('/reslog',auth.resterauntLogin)



module.exports = router;
