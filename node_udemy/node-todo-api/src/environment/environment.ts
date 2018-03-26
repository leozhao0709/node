export let environment: {
    PORT: string;
    MONGODB_URI: string;
    AUTH_SECRET: string;
} = require('../config/env.json');

if (process.env.NODE_ENV === 'prod') {
    const prodEnv = require('../config/env.prod.json');
    environment = {
        ...environment,
        ...prodEnv
    };
} else if (process.env.NODE_ENV === 'test') {
    const testEnv = require('../config/env.test.json');
    environment = {
        ...environment,
        ...testEnv
    };
}
