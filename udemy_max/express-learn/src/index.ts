import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server start on port ${port}`);
});
