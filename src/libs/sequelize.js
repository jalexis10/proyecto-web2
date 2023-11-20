const {Sequelize} = require ('sequelize');
const setUpModels = require('../../db/models');

const sequelize = new Sequelize('tienda-db','postgres','jose1993',{
host: 'localhost',
dialect: 'postgres',
logging: true
});

setUpModels(sequelize);
sequelize.sync();
module.exports = sequelize;