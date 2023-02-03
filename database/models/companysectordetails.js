'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class companySectorDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      companySectorDetails.belongsTo(models.companyDetails, {
        foreignKey: 'companyId',
        as: 'companyDetails'
      });
    }
  }
  companySectorDetails.init({
    performanceIndex: DataTypes.ARRAY(DataTypes.JSON)
  }, {
    sequelize,
    modelName: 'companySectorDetails',
  });
  return companySectorDetails;
};