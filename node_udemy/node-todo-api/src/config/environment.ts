export let environment: {
    PORT: string,
    MONGODB_URI: string
} = require('./env.json');

if (process.env.NODE_ENV === 'prod') {
    const prodEnv = require('./env.prod.json');
    environment = {
        ...environment,
        ...prodEnv
    };
} else if (process.env.NODE_ENV === 'test') {
    const testEnv = require('./env.test.json');
    environment = {
        ...environment,
        ...testEnv
    };
}
