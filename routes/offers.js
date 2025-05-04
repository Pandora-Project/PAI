// routes/offerRoutes.js or inside tenderRoutes.js if nested
const express = require('express');
const router = express.Router({ mergeParams: true });
const offerController = require('../controllers/offerController');

router.get('/tenders/:tenderId/offers/new', offerController.newForm);
router.post('/tenders/:tenderId/offers', offerController.create);

module.exports = router;
