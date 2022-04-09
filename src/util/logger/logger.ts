import { NAME, NODE_ENV } from '@config/environment';
import { createLogger, format, Logger, transports } from 'winston';
import * as TransportStream from 'winston-transport';

const LogFactory = (label: string, customTransports?: TransportStream[]) => {
  customTransports = customTransports ? customTransports : [];
  return createLogger({
    level: NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
      format.label({ label }),
      format.timestamp(),
      format.printf(log => `${log.timestamp} ${log.level.toUpperCase()} [${log.label}] ${log.message}`),
      format.colorize({ all: true })
    ),
    transports: [
      new transports.Console(),
      ...customTransports,
    ]
  });
};

const logger = LogFactory(NAME);

export { logger, Logger, LogFactory };
