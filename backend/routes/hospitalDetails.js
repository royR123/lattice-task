const express = require('express');
const router = express.Router();

router.get('/:hospitalId'  , require('../controllers/getHospitalDetails'));

module.exports = router;