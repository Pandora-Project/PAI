const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db');
const tenderRoutes = require('./routes/tenders');
const Tender = require('./models/Tender');
const offerRoutes = require('./routes/offers');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', require('./routes/index'));
app.use('/tenders', tenderRoutes);
app.use('/', offerRoutes);
// Database Sync
sequelize.sync({ force: false }) // 'force: false' will not drop the table but will sync changes
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
