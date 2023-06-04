import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
export const fetchDistance = async (city1: string , city2 : string) => {
  const {data} = await axios.post(API_URL, {
    city1,
    city2,
  });
  return data;
};


export const getCity = async () => {
  const {data} = await axios.get(API_URL, );
  return data;
}
