const { Tender, Offer } = require('../models');
const { Op } = require('sequelize');

exports.home = async (req, res) => {
  try {
    const tenders = await Tender.findAll({
      where: {
        status: 'active',
        startDate: { [Op.lte]: new Date() },
        endDate: { [Op.gte]: new Date() },
      },
      order: [['endDate', 'ASC']]
    });

    res.render('tenders/home', {
      title: 'Open Tenders',
      tenders
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Error loading homepage');
  }
};


// List active tenders
exports.listActive = async (req, res) => {
  try {
    const activeTenders = await Tender.findAll({
      where: {
        status: 'active',
        startDate: { [Op.lte]: new Date() },
        endDate: { [Op.gte]: new Date() },
      },
    });

    res.send(activeTenders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching active tenders');
  }
};


// controllers/tenderController.js
exports.listClosed = async (req, res, next) => {
  try {
    const closedTenders = await Tender.findAll({
      where: { status: 'closed' },
      order: [['endDate', 'DESC']]
    });
    res.render('tenders/closed', {
      title: 'Closed Tenders',
      closedTenders
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


// Add new tender
exports.addTender = async (req, res) => {
  try {
    const { name, institution, description, startDate, endDate, maxBudget } = req.body;

    await Tender.create({
      name,
      institution,
      description,
      startDate,
      endDate,
      maxBudget,
      status: 'active',
    });
    return res.redirect('/');

  } catch (error) {
    console.error('Error Creating Tender:', error);

    return res.status(500).send('Error creating tender');
  }
};


// Add tender form
exports.addForm = (req, res) => {
  res.render('tenders/form', { title: 'Add New Tender' });
};


exports.details = async (req, res) => {
  try {
    const tender = await Tender.findByPk(req.params.id, {
      include: [{
        model: Offer
      }],
      order: [[{ model: Offer }, 'amount', 'DESC']]
    });
    

    if (!tender) return res.status(404).send('Tender not found');
    
    res.render('tenders/details', {
      title: `Tender Details: ${tender.name}`,
      tender
    });
  } catch (err) {
    console.error('Error retrieving tender details:', err);
    res.status(500).send('Error retrieving tender details');
  }
};

exports.closeTender = async (req, res) => {
  try {
    const tenderId = req.params.id;
    const tender = await Tender.findByPk(req.params.id, {
      include: [{
        model: Offer
      }],
      order: [[{ model: Offer }, 'amount', 'DESC']]
    });
    

    if (!tender) {
      return res.status(404).json({ message: 'Tender not found' });
    }

    // If the tender's endDate is in the past, update its status to 'closed'
    if (new Date(tender.endDate) < new Date()) {
      tender.status = 'closed'; // Change the status to 'closed'
      await tender.save(); // Save the updated tender to the database
      return res.status(200).json(tender); // Return the updated tender object  
    } else {
      return res.status(400).json({ message: 'Tender is still active' });
    }
  } catch (error) {
    console.error('Error closing tender:', error);
    return res.status(500).json({ message: 'Error closing tender' });
  }
};