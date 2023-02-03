const controller = require('../controllers/companydetails');

const router = require('express').Router();

router.post('/save', controller.saveCompanyDetails);

module.exports = router;