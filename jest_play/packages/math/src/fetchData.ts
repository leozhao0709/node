import axios from 'axios';

const fetchData = async () => {
  const { data } = await axios.get('/something');
  return data;
};

export default fetchData;
