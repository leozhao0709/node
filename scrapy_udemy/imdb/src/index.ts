import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';

// (async () => {
//   const response = (await axios.get('https://www.imdb.com/title/tt2948372/?ref_=hm_fanfav_tt_1_pd_fp1')).data;

//   const $ = cheerio.load(response);
//   const title = $('.title_wrapper > h1').text();
//   const rating = $('.ratings_wrapper .ratingValue > strong > span').text();
//   const poster = $('.poster img').attr('src');

//   console.log(title, rating, poster);
// })();

(async () => {
  const loginPage = await axios.get('http://quotes.toscrape.com/login');

  // console.log(loginPage.headers['set-cookie']); // ['session=eyJjc3JmX3Rva2VuIjoialR4dEJKTWdwSFZ5R1lFTkNuenNlQVhhcW9ESVNiWmNGbXdRZktSbHVyVU9kTGlraHZXUCJ9.X-6o6g.7FQDXIwRhTFhX7qJWrItGeoMy4E; HttpOnly; Path=/']

  const cookie = loginPage.headers['set-cookie'].map((value) => value.split(';')[0]).join(' ');
  console.log(cookie); // session=eyJjc3JmX3Rva2VuIjoiYk50a1NLcFpUcmpVUkdtY1h2TXpJRkF5b3hpc1FxT1dCYWVIbmRnd2ZKRENZRUxobHVWUCJ9.X-6qkQ.mmWvS_wvf7yL_WPKx8uRXzF4DKw

  const $ = cheerio.load(loginPage.data);
  const csrfToken = $('input[name="csrf_token"]').val();
  console.log(csrfToken);

  const formData = new FormData(); // need install form-data dependency
  formData.append('username', 'admin');
  formData.append('password', 'admin');
  formData.append('csrf_token', csrfToken);

  // login
  const login = await axios.post('http://quotes.toscrape.com/login', formData, {
    headers: {
      ...formData.getHeaders(),
      Cookie: cookie,
    },
  });
  console.log(login.data); // redirect to home page
})();
