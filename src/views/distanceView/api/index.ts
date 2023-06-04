import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_API_URL;
export const fetchDistance = async (city1: string | undefined | number, city2 : string | undefined | number) => {
  if (!city1 || !city2) throw new Error('City name is required');
  const {data} = await axios.post(`${API_URL}/distance`, {
    city1,
    city2,
  });
  return data;
};


export const getCityByName = async (cityName: string) => {
  const {data} = await axios.get( `${API_URL}/city?name=${cityName}`, );
  return data;
}
