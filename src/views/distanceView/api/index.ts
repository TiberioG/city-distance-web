import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
export const fetchDistance = async (city1, city2) => {
  const {data} = await axios.post(API_URL, {
    city1,
    city2,
  });
  return data;
};


export const getCity = async (city) => {
  const {data} = await axios.get(API_URL, );
  return data;
}
