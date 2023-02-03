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
    id: DataTypes.STRING,
    name: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
    ceo: DataTypes.STRING,
    numberEmployees: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'companyDetails',
  });
  return companyDetails;
};