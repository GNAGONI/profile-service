const fs = require('fs');
const path = require('path');
const { passwordUtil } = require('@microservices-inc/common');
const { dbQuery } = require('./index');

const seed = async () => {
  try {
    const profilesId = fs.readFileSync(
      path.resolve(__dirname, './idData.sql'),
      'utf8',
    );
    const tablesSQL = fs.readFileSync(
      path.resolve(__dirname, './tables.sql'),
      'utf8',
    );
    const seedSQL = fs.readFileSync(
      path.resolve(__dirname, './seed.sql'),
      'utf8',
    );
    const functionsSQL = fs.readFileSync(
      path.resolve(__dirname, './functions.sql'),
      'utf8',
    );

    const defaultUserTypePassword = '1234';
    const hash = passwordUtil.convertToHash(defaultUserTypePassword);

    await dbQuery(tablesSQL);
    await dbQuery(functionsSQL);
    await dbQuery(seedSQL);
    await dbQuery(`SELECT fill_data(${profilesId}, '${hash}');`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(2);
  }
};

seed();
