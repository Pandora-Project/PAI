// test-connection.js
require('dotenv').config();
const { sequelize } = require('./models');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection OK');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  } finally {
    process.exit();
  }
})();
