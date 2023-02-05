const controller = require('../controllers/companydetails');
const {urlValidator} = require('../middlewares/validator');
const router = require('express').Router();

router.post('/save',urlValidator,controller.saveCompanyDetails);
router.get('/companies/:sectorName',controller.getTopRankedCompanyDetails);

module.exports = router;