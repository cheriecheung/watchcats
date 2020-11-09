const winston = require('winston');

const logger = name => winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console()
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
  exitOnError: false,
});

module.exports = {
  debug: (log, metadata) => {
    logger().debug(log, metadata);
  },

  info: (log, metadata) => {
    logger().info(log, metadata);
  },

  warn: (log, metadata) => {
    logger().warn(log, metadata);
  },

  error: (log, metadata) => {
    logger().error(log, metadata);
  },

  log: (level, log, metadata) => {
    const metadataObject = {}
    if (metadata) metadataObject.metadata = metadata

    logger()[level](log, metadataObject)
  },
}