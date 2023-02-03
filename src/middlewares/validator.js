const Joi = require('joi');
const {HTTPError} = require('../src/error');

const urlSchema = Joi.object({
  task: Joi.string().regex(/^[0-9]+$/).min(1).max(30).required()
});

const urlValidator = async (req, res, next) => {
  try {
    const { error } = urlSchema.validate(req.body);
    if (error) {
      throw new HTTPError(error.message, 400);
    }
    next();
  }
  catch (error) {
    if(error instanceof HTTPError){
      res.status(error.code).json({
        message: error.message,
      });
      return;
    }
    else{
      res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  }
};
module.exports ={
  urlValidator,
};