import * as express from 'express';

const app = express();

const port = process.env.PORT || 3000;

app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log(`Server is up on ${port}`);
});