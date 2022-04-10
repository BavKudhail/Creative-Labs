//importing sequelize
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
//heroku
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    // "creatives_db",
    process.env.DB_USER,
    //"root",
    process.env.DB_PW,
    //"",
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
    }
  );
}

module.exports = sequelize;
