const express = require('express');
const { validate } = require('../middleware/validate')
const router = express.Router();

router.post('/:psychiatristId' , validate , require('../controllers/registerPatient'))

module.exports = router;