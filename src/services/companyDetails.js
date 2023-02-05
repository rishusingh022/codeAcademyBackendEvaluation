
const db = require('../../database/models');
const {companyDetails,companySectorDetails} = db;

const saveCompanyDetails = (data) => {
  return companyDetails.create({
    companyId : data.id,
    name: data.name,
    description: data.description,
    ceo: data.ceo,
    tags: data.tags,
  });
};
const saveCompanySectorDetails= (data) => {
  return companySectorDetails.create({
    performanceIndex: data,
  });
};
const updateCompanyScore = (scoreObj) => {
  return companyDetails.update({
    score: scoreObj.score,
    sector: scoreObj.sector,
  }, {
    where: {
      companyId: scoreObj.companyId,
    },
  });
};
const getTopRankedCompanyDetails = async (sectorName) => {
  const data = await companyDetails.findAll({
    where: {
      sector: sectorName,
    },
    order: [
      ['score', 'DESC'],
    ],
  });
  const res = [];
  for(let i=0;i<data.length;i++){
    res.push({
      id: data[i].companyId,
      name: data[i].name,
      ceo: data[i].ceo,
      score: data[i].score,
      ranking: i+1,
    });
  }
  return res;
};
module.exports= {
  saveCompanyDetails,
  saveCompanySectorDetails,
  updateCompanyScore,
  getTopRankedCompanyDetails,
};