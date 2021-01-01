import axios from 'axios';
import cheerio from 'cheerio';

(async () => {
  const response = (await axios.get('https://www.imdb.com/title/tt2948372/?ref_=hm_fanfav_tt_1_pd_fp1')).data;

  const $ = cheerio.load(response);
  const title = $('.title_wrapper > h1').text();
  const rating = $('.ratings_wrapper .ratingValue > strong > span').text();
  const poster = $('.poster img').attr('src');

  console.log(title, rating, poster);
})();
