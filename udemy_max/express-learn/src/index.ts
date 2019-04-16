import bodyParser from 'body-parser';
import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';
import adminRouter from './routes/adminRouter';
import shopRouter from './routes/shopRouter';

const app = express();

// the first argument to nunjucks is the path to the folder
nunjucks.configure(path.resolve(__dirname, 'views'), {
  autoescape: true,
  express: app
});

// body parser convert
app.use(bodyParser.urlencoded({ extended: false }));

// serve static file (css, js)
app.use(express.static(path.resolve(__dirname, 'public')));

app.use(shopRouter);
app.use('/admin', adminRouter);

// setup 404 page, this must be the last middleware
app.use((req, res, next) => {
  res.status(404).render('404.html');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`server start on port ${port}`);
});
