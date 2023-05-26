import log4js from 'log4js';

log4js.addLayout('json', function () {
  return function (logEvent) {
    const { startTime, data, level, pid, context, error } = logEvent;
    return JSON.stringify({
      startTime,
      level: level.levelStr,
      data,
      pid,
      context,
      error,
    });
  };
});

log4js.configure({
  appenders: {
    console: {
      type: 'console',
      layout: {
        type: 'pattern',
        pattern: '[%d] [%c] [%z] [%p] - %m',
      },
    },
    file: {
      type: 'dateFile',
      filename: './log/app.log',
      pattern: 'yyyy-MM-dd-hh', // log file based on each hour
      compress: true,
      layout: {
        type: 'json',
      },
    },
  },
  categories: {
    default: { appenders: ['console'], level: 'trace' },
    // file: { appenders: ['file'], level: 'debug' },
  },
});

// const logger = log4js.getLogger('file');
const logger = log4js.getLogger('default');

export default logger;
