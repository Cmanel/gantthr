module.exports =
{
    HOST: "LFR024662",
   // USER: "writebacklogin",
    //PASSWORD: "Writeback2021!",
    DB: "writeback",
    dialect: "mssql",
    dialectModulePath: 'sequelize-msnodesqlv8',
    dialectOptions: {
      driver: 'SQL Server Native Client 11.0',
      instanceName: 'SQLEXPRESS',
      trustedConnection: true
    },
    PORT: 1433,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };