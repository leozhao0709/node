import config from './config/index.js';
import App from './App.js';
import logger from './utils/logger.js';

function main() {
  const app = new App();

  app.listen(config.PORT, () => {
    logger.info(`app start at ${config.HOST}:${config.PORT}`);
  });
}

main();
