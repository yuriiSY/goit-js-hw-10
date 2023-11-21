import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com';
axios.defaults.headers.common['x-api-key'] =
  'live_lraiOM9C3DfN6u5Dyr7wifwCkXvT4KWnWpspmJS8j9nbMQxndDH27tz9AzXWAqpd';

export function fetchBreeds(breedId) {
  const PATH = 'v1/images/search';
  const PARAMS = new URLSearchParams({
    breed_ids: breedId,
  });
  return axios.get(`${BASE_URL}/${PATH}?${PARAMS}`).then(resp => {
    return resp.data;
  });
}

export function fetchAllBreeds() {
  const PATH = 'v1/breeds';
  return axios.get(`${BASE_URL}/${PATH}`).then(resp => {
    return resp.data;
  });
}
