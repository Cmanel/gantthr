import winston from 'winston';
import util from 'util';
import _ from 'lodash';
import path from 'path';
// import { parseBoolean } from './parsers';

// const isJsonFormat = parseBoolean(process.env.LOG_JSON, false);
const logLevel = process.env.LOG_LEVEL || 'debug';

function getLabel(callingModule) {
  if (callingModule) {
    // Ack for morgan logger
    if (typeof callingModule === 'string') {
      return callingModule;
    }

    const parts = callingModule.filename.split(path.sep);
    return `${parts[parts.length - 2]}/${parts.pop()}`;
  }

  return undefined;
}

export default function createLogger(callingModule) {
  const rewriteMetaFormat = winston.format((meta) => {
    if (!meta) {
      return undefined;
    }

    let newMeta = meta;

    if (meta.timings) {
      newMeta = _.omit(meta, 'timings');
    }

    if (meta.user) {
      newMeta = _.omit(meta, 'user');
    }

    return newMeta;
  });

  const logger = winston.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          rewriteMetaFormat(),
          winston.format.splat(),
          winston.format.timestamp(),
          winston.format.align(),
          winston.format.label({ label: getLabel(callingModule) }),
          winston.format.printf(
            (info) =>
              `${info.timestamp} ${info.level}: ${info.label}: ${info.message} ${
                info.meta
                  ? util.inspect(info.meta, {
                      showHidden: false,
                      showProxy: false,
                      colors: true,
                    })
                  : ''
              }`
          )
        ),
        level: logLevel,
      }),
    ],
  });

  // Adding a stream for morgan express logger
  logger.stream = {
    write: (message) => {
      if (!message) {
        return;
      }

      const metaIndex = message.indexOf('@@');
      if (metaIndex >= 0) {
        const meta = JSON.parse(message.substr(metaIndex + 2));
        const newMessage = message.substr(0, metaIndex);
        logger.info(newMessage.trim(), meta);
      } else {
        logger.info(message && message.trim());
      }
    },
  };

  return logger;
}
