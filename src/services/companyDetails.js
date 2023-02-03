
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
  }, {
    where: {
      companyId: scoreObj.companyId,
    },
  });
};
module.exports= {
  saveCompanyDetails,
  saveCompanySectorDetails,
  updateCompanyScore,
};