const Sequelize = require('sequelize');

const { database, user, password, host, port } = process.env;
const sequelize = new Sequelize(database, user, password, {
  host: host,
  port: port,
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    freezeTableName: true,
    underscored: true
  },
  logging: false
});

const todo = require('./models/todo')(sequelize, Sequelize);

const db = {
  Sequelize,
  sequelize,
  todo
};

db.sequelize.sync({ /*force: true*/ });

module.exports = db;