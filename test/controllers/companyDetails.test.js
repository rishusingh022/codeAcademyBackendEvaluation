const companyDetailsController = require('../../src/controllers/companydetails');
const companyDetailsServices = require('../../src/services/companyDetails');
jest.setTimeout(4000000);
describe('TestCases for company details controller', () => {
  describe('TestCases for saveCompanyDetails', () => {
    it('Should return 201 as status code when company details are saved successfully', async () => {
      const mockReq = {
        body: {
          urlLink: 'https://store-0001.s3.amazonaws.com/input.csv'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      jest.spyOn(companyDetailsServices, 'saveCompanyDetails').mockResolvedValue(1);
      jest.spyOn(companyDetailsServices, 'saveCompanySectorDetails').mockResolvedValue(1);
      jest.spyOn(companyDetailsServices, 'updateCompanyScore').mockResolvedValue(1);
      await companyDetailsController.saveCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith({
        message: 'Company details saved successfully'
      });
    });
    
  });
  
});
