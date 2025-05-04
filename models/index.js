const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const sequelize = require('../config/db');

const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const modelPath = path.join(__dirname, file);
    const modelModule = require(modelPath);

    // Handle both function exports and class exports
    let model;
    if (typeof modelModule === 'function') {
      model = modelModule(sequelize, Sequelize.DataTypes);
    } else if (modelModule instanceof Sequelize.Model) {
      model = modelModule;
    } else {
      console.warn(`Skipping ${file}: unsupported export type`);
      return;
    }

    db[model.name] = model;
  });

// Set up associations
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;