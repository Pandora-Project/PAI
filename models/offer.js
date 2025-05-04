const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    tenderId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    bidderName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  });

  Offer.associate = (models) => {
    Offer.belongsTo(models.Tender, { foreignKey: 'tenderId' });
  };

  return Offer;
};