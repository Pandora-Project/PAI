const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Tender = sequelize.define('Tender', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    maxBudget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'closed'),
      defaultValue: 'active',
      allowNull: false,
    },
  });

  Tender.associate = (models) => {
    Tender.hasMany(models.Offer, { foreignKey: 'tenderId' });
  };

  return Tender;
};