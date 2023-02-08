const axios  = require('axios');
const companyDetailsController = require('../../src/controllers/companydetails');
const companyDetailsServices = require('../../src/services/companyDetails');
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
      jest.spyOn(axios, 'get').mockResolvedValue({data:  []});
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
  describe('TestCases for getTopRankedCompanyDetails', () => {
    it('Should return 200 as status code when top ranked companies are fetched successfully', async () => {
      const mockReq = {
        params: {
          sectorName: 'sectorName'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      jest.spyOn(companyDetailsServices, 'getTopRankedCompanyDetails').mockResolvedValue([{
        id: undefined,
        name: 'test',
        ceo: 'test',
        score: 100,
        ranking: 1,
      }]);
      await companyDetailsController.getTopRankedCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        messsage: 'Top ranked companies fetched successfully',
        data: [{
          id: undefined,
          name: 'test',
          ceo: 'test',
          score: 100,
          ranking: 1,
        }]
      });
    });
    it('Should return 500 as status code when there is error Other then https error', async () => {
      const mockReq = {
        params: {
          sectorName: 'sectorName'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      jest.spyOn(companyDetailsServices, 'getTopRankedCompanyDetails').mockRejectedValue(new Error('Internal Server Error'));
      await companyDetailsController.getTopRankedCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: 'Internal Server Error'
      });
    });
  });
  describe('TestCases for updateCompanyDetails', () => {
    it('Should return 200 as status code when company details are updated successfully', async () => {
      const mockReq = {
        params: {
          id: 1
        },
        body: {
          name: 'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      jest.spyOn(companyDetailsServices, 'updateCompanyDetails').mockResolvedValue([1]);
      await companyDetailsController.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        messsage: 'Company details updated successfully',
        data: [1]
      });
    });
    it('Should return 500 as status code when there is error Other then https error', async () => {
      const mockReq = {
        params: {
          id: 1
        },
        body: {
          name: 'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      jest.spyOn(companyDetailsServices, 'updateCompanyDetails').mockRejectedValue(new Error('Internal Server Error'));
      await companyDetailsController.updateCompanyDetails(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({
        message: 'Internal Server Error'
      });
    });
  });
});
