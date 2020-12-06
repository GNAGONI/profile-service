const fs = require('fs');
const path = require('path');
const { client } = require('./index');

const seed = async () => {
  try {
    const numberOfProfiles = 1000;
    const seedSQL = fs.readFileSync(
      path.resolve(__dirname, './seed.sql'),
      'utf8',
    );
    const functionsSQL = fs.readFileSync(
      path.resolve(__dirname, './functions.sql'),
      'utf8',
    );

    await client.connect();
    await client.query(seedSQL);
    await client.query(`SELECT fill_data(${numberOfProfiles});`);
    await client.query(functionsSQL);
    await client.end();
  } catch (err) {
    console.error(err);
    process.exit();
  }
};

seed();
