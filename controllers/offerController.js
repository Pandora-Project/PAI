const { Tender, Offer } = require('../models');

exports.newForm = async (req, res) => {
    const tender = await Tender.findByPk(req.params.tenderId);
    if (!tender) return res.status(404).send('Tender not found');
  
    res.render('offers/form', {
      tender,
      title: `Submit Offer for ${tender.name}`
    });
  };

exports.create = async (req, res) => {
  try {
    const { bidderName, amount, message } = req.body;
    await Offer.create({
      tenderId: req.params.tenderId,
      bidderName,
      amount,
      message,
    });
    res.redirect(`/tenders/${req.params.tenderId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error submitting offer');
  }
};
