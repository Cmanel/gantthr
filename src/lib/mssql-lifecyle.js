/*import { parseIntNumber } from './parsers';
import './env';

console.log(process.env.PG_HOST, process.env.PG_USER, process.env.PG_PORT);

const knex = require('knex')({
  client: 'pg',
  debug: true,
  connection: {
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    port: parseIntNumber(process.env.PG_PORT) || 5432,
    password: process.env.PG_PASSWORD,
    database: 'arts_et_delices',
    charset: 'utf8',
  },
  searchPath: ['knex', 'arts_et_delices'],
});

const bookshelf = require('bookshelf')(knex);
const logger = require('./logger').default(module);

logger.info('PostgresSQL database connection initialized');

// bookshelf.plugin('bookshelf-case-converter-plugin');
module.exports = bookshelf;
*/

const dbConfig = require("./dbConfig.js");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port:dbConfig.PORT,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
//db.subtask = require("../model/subtask.model.js")(sequelize, Sequelize);
import makeSubtask from '../model/subtask.model.js';
db.subtask = makeSubtask(sequelize, Sequelize);


module.exports = db;
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

 
