// seed.js
const { sequelize, Tender, Offer } = require('./models');

async function seed() {
  try {
    // 1. Re-create tables
    await sequelize.sync({ force: true });
    console.log('⟳ Database synced (all tables dropped & recreated).');

    // 2. Create sample tenders
    const [officeSupplies, networkUpgrade] = await Promise.all([
      Tender.create({
        title: 'Office Supplies Procurement',
        institution: 'City Hall',
        description: 'Purchase of stationery, paper, and office equipment.',
        startAt: new Date('2025-03-01T09:00:00'),
        endAt:   new Date('2025-03-10T17:00:00'),
        budget: 5000.00,
      }),
      Tender.create({
        title: 'Campus Network Upgrade',
        institution: 'Tech University',
        description: 'Replacement of routers, switches, and cabling on all buildings.',
        startAt: new Date('2025-03-05T08:00:00'),
        endAt:   new Date('2025-03-20T18:00:00'),
        budget: 20000.00,
      }),
    ]);

    console.log('✓ Sample tenders created.');

    // 3. Create sample offers
    await Offer.bulkCreate([
      {
        tenderId: officeSupplies.id,
        bidderName: 'Alpha Stationers Ltd.',
        amount: 4500.00,
        submittedAt: new Date('2025-03-02T10:30:00'),
      },
      {
        tenderId: officeSupplies.id,
        bidderName: 'Beta Office Co.',
        amount: 4800.00,
        submittedAt: new Date('2025-03-03T11:00:00'),
      },
      {
        tenderId: networkUpgrade.id,
        bidderName: 'NetPros Inc.',
        amount: 19500.00,
        submittedAt: new Date('2025-03-06T09:45:00'),
      },
      {
        tenderId: networkUpgrade.id,
        bidderName: 'Infra Solutions',
        amount: 21000.00,  // over budget
        submittedAt: new Date('2025-03-07T15:20:00'),
      },
    ]);

    console.log('✓ Sample offers created.');
    console.log('✅ Seeding complete. 🎉');
    process.exit(0);

  } catch (err) {
    console.error('❌ Seeding error:', err);
    process.exit(1);
  }
}

seed();
// Note: Ensure that the database connection is properly configured in your models/index.js file.
// This script assumes that you have a working Sequelize setup and the models are defined correctly.