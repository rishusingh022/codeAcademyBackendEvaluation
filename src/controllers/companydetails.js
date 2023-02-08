const companyServices = require('../services/companyDetails');
const axios = require('axios');

let score = [];
let saveRes = [];
const getURL = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
const saveCompanyDetails = async (req, res) => {
  try{
    const { body } = req;
    await getURL(body.urlLink)
      .then(async(data) => {
        const splitData = data.split('\n');
        let i = 0;
        for(const item of splitData) {
          if(i === 0){
            i++;
          }
          else{
            let companyId = -1;
            let companyName = '';
            const splitItem = item.split(',');
            const id = splitItem[0];
            const sector = splitItem[1];
            await getURL(`http://54.167.46.10/company/${id}`)
              .then(data => {
                companyId = data.id;
                companyName = data.name;
                companyServices.saveCompanyDetails(data);
              })
              .catch(err => console.log(err));
            await getURL(`http://54.167.46.10/sector?name=${sector}`)
              .then(data => {
                data.forEach(ele => {
                  if(ele.companyId === companyId){
                    const performanceIndexMatrix = ele.performanceIndex;
                    let temp_score = 0;
                    performanceIndexMatrix.forEach(element => {
                      if(element.key === 'cpi'){
                        temp_score+= 10 * element.value;
                      }
                      else if(element.key==='cf'){
                        temp_score+= element.value/10000;
                      }
                      else if(element.key === 'mau'){
                        temp_score+= 10 * element.value;
                      }
                      else if(element.key === 'roic'){
                        temp_score+= element.value;
                      }
                    });
                    score.push({
                      companyId: companyId,
                      score: Math.round((temp_score/4) * 100) / 100,
                      sector: sector,
                    });
                    saveRes.push({
                      companyId: companyId,
                      name : companyName,
                      score: Math.round((temp_score/4) * 100) / 100,
                    });
                  }
                });
                companyServices.saveCompanySectorDetails(data);
              })
              .catch(err => console.log(err));

          }
        }

      })
      .catch(err => console.log(err));

    score.forEach(scoreObj=> {
      companyServices.updateCompanyScore(scoreObj);
    });
    return res.status(201).json({
      message : 'Company details saved successfully',
      data : saveRes,
    });
  }
  catch(err){
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const getTopRankedCompanyDetails = async (req, res) => {
  try{
    const topRankedCompanies = await companyServices.getTopRankedCompanyDetails(req.params.sectorName);
    return res.status(200).json({
      messsage : 'Top ranked companies fetched successfully',
      data : topRankedCompanies,
    });
  }
  catch(err){
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
const updateCompanyDetails = async (req, res) => {
  try{
    const updatedCompanyDetails = await companyServices.updateCompanyDetails(req.params.id, req.body);
    return res.status(200).json({
      messsage : 'Company details updated successfully',
      data : updatedCompanyDetails,
    });
  }
  catch(err){
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  saveCompanyDetails,
  getTopRankedCompanyDetails,
  updateCompanyDetails,
}; 