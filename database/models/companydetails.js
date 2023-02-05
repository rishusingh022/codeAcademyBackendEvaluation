'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companyDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      companyDetails.hasOne(models.companySectorDetails, {
        foreignKey: 'companyId',
        as: 'companySectorDetails'
      });
    }
  }
  companyDetails.init({
    companyId: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    ceo: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    score: DataTypes.FLOAT,
    sector: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'companyDetails',
  });
  return companyDetails;
};