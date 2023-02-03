const companyServices = require('../services/companyDetails');
const axios = require('axios');
let score = [];
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
    getURL(body.urlLink)
      .then(data => {
        const splitData = data.split('\n');
        let i = 0;
        splitData.forEach((item) => {
          if(i === 0){
            i++;
          }
          else{
            let companyId = -1;
            const splitItem = item.split(',');
            const id = splitItem[0];
            const sector = splitItem[1];
            getURL(`http://54.167.46.10/company/${id}`)
              .then(data => {
                companyId = data.id;
                companyServices.saveCompanyDetails(data);
              })
              .catch(err => console.log(err));
            getURL(`http://54.167.46.10/sector?name=${sector}`)
              .then(data => {
                data.forEach(ele => {
                  if(ele.id === companyId){
                    const performanceIndexMatrix = ele.performanceIndexMatrix;
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
                      score: temp_score,
                    });
                  }
                });
                companyServices.saveCompanySectorDetails(companyId,data);
              })
              .catch(err => console.log(err));

          }
        });
       
      })
      .catch(err => console.log(err));

    score.forEach(scoreObj=> {
      companyServices.updateCompanyScore(scoreObj);
    });
    return res.status(201).json({
      message : 'Company details saved successfully',
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
}; 
