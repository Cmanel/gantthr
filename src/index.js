import { createServer } from 'http';
import addShutdown from 'http-shutdown';
import express from 'express';
import cors from 'cors';
import util from 'util';
import routes from './routes';
import Logger from './lib/logger';

import './lib/env';

const logger = Logger(module);

logger.info(`Starting in ${process.env.NODE_ENV} mode`);

const stopWebServer = async (webServer) => {
  if (!webServer) {
    return undefined;
  }

  return new Promise((resolve) => {
    logger.info('Server shuting down...');
    webServer.shutdown(() => {
      logger.info('Server stopped');
      logger.info('Wait 3s');
      // Wait 3sec otherwise on quick restart with nodemon, we got the error EADDRINUSE: address already in use
      setTimeout(resolve, 3000);
    });
  });
};

const attachClosingTasks = (closeHandlerFn) => {
  // Attach closing tasks
  process.on('SIGINT', () => {
    logger.info('SIGINT received');
    if (closeHandlerFn) closeHandlerFn();
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (closeHandlerFn) closeHandlerFn();
  });

  process.on('uncaughtException', (err) => {
    logger.error('uncaughtException %s', util.inspect(err, true, 0, true));
    if (closeHandlerFn) closeHandlerFn();
  });

  // Attach closing tasks
  process.on('exit', () => {
    // you must only perform synchronous operations in this handler.
  });

  process.on('unhandledRejection', (err, p) => {
    logger.error('Unhandled Rejection at: %s', util.inspect(p, true, 0, true));
    logger.error(util.inspect(err, true, 1, true));
  });
};

const app = express();
app.use(cors());
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())
app.use(routes);

const httpServer = createServer(app);

// Set timeout to 15min to avoid database feeding problems
httpServer.setTimeout(15 * 60 * 1000);

addShutdown(httpServer);
const port = process.env.PORT;
httpServer.listen(
  {
    port,
  },
  () => {
    const baseUrl = `http://localhost:${port}`;
    logger.info(`${' '} Server is running on ${baseUrl}`);
  }
);

attachClosingTasks(async () => {
  await stopWebServer(httpServer);
  process.exit(0);
});

const db= require("./lib/mssql-lifecyle");
db.sequelize.sync();
