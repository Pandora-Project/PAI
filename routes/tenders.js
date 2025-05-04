const express = require('express');
const router  = express.Router();
const C       = require('../controllers/tenderController');

router.get('/',           C.home);
router.get('/closed',     C.listClosed);     // ← before :id
router.get('/add',        C.addForm);
router.post('/add',       C.addTender);
router.get('/:id',        C.details);
router.patch('/:id/close',C.closeTender);

module.exports = router;
