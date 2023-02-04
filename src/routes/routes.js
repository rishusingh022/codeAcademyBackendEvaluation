const controller = require('../controllers/companydetails');
const {urlValidator} = require('../middlewares/validators');
const router = require('express').Router();

router.post('/save',urlValidator,controller.saveCompanyDetails);

module.exports = router;