const controller = require('../controllers/companydetails');
const {urlValidator} = require('../middlewares/validator');
const router = require('express').Router();

router.post('/save',urlValidator,controller.saveCompanyDetails);

module.exports = router;