module.exports = {
    HOST: "localhost",
    USER: "writebacklogin",
    PASSWORD: "Writeback2021!",
    DB: "writeback",
    dialect: "mssql",
    PORT: 1433,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };