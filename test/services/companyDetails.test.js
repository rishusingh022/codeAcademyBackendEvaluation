const companyDataServices = require('../../src/services/companyDetails');
const db = require('../../database/models');

describe('TestCases for company data services', () => {
  describe('TestCases for saveCompanyDetails', () => {
    it('Should save company details fetched', async () => {
      const mockRes = {
        id: 'test',
        name: 'test',
        description: 'test',
        ceo: 'test',
        tags: ['test', 'test', 'test', 'test']
      };
      jest.spyOn(db.companyDetails, 'create').mockResolvedValue(mockRes);
      const companyDetails = await companyDataServices.saveCompanyDetails(mockRes);
      expect(companyDetails).toEqual(mockRes);
    });
  });
  describe('TestCases for saveCompanySectorDetails', () => {
    it('Should save company sector details fetched', async () => {
      // mock res is an array of json objects
      const mockRes = [{
        id: 'test',
        name: 'test',
        description: 'test',
        ceo: 'test',
        tags: ['test', 'test', 'test', 'test']
      }];
      jest.spyOn(db.companyDetails, 'create').mockResolvedValue(mockRes);
      const companyDetails = await companyDataServices.saveCompanyDetails(mockRes);
      expect(companyDetails).toEqual(mockRes);
    });
  });
  describe('TestCases for updateCompanyScore', () => {
    it('Should update company score', async () => {
      const mockReq = {
        companyId: 'test',
        score: 100
      };
      const mockRes = 1 ;
      jest.spyOn(db.companyDetails, 'update').mockResolvedValue(mockRes);
      const companyDetails = await companyDataServices.updateCompanyScore(mockReq);
      expect(companyDetails).toEqual(mockRes);
    });
  });
});