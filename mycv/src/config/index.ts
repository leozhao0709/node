import appConfig from './app.config';

export const getEnvFilePath = () => {
  const env: string[] = [];
  switch (process.env.NODE_ENV) {
    case 'production':
      env.push('env/production.env');
      break;
    case 'test':
      env.push('env/test.env');
      break;
    default:
      env.push('env/development.env');
  }
  env.push('env/default.env');
  return env;
};

export const getConfiguration = () => [appConfig];
