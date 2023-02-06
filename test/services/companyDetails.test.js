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
  describe('TestCases for getTopRankedCompanyDetails', () => {
    it('Should get top ranked companies', async () => {
      const mockReq = {
        sectorName: 'test',
      };
      // Array [Object {}]
      const mockRes = [{
        id: undefined,
        name: 'test',
        ceo: 'test',
        score: 100,
        ranking: 1,
      }];
      jest.spyOn(db.companyDetails, 'findAll').mockResolvedValue(mockRes);
      const companyDetails = await companyDataServices.getTopRankedCompanyDetails(mockReq.sectorName);
      expect(companyDetails).toEqual(mockRes);
    });
  });
  describe('TestCases for updateCompanyDetails', () => {
    it('Should update company details', async () => {
      const mockReq = {
        params: {
          id: 'test',
        },
        body : {
          name: 'test',
          ceo: 'test',
        }
      };
      const mockRes = 1;
      jest.spyOn(db.companyDetails, 'update').mockResolvedValue(mockRes);
      const companyDetails = await companyDataServices.updateCompanyDetails(mockReq.params.id, mockReq.body);
      expect(companyDetails).toEqual(mockRes);
    });
  });
});
