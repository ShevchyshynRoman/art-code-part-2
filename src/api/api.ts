import axios from 'axios';

const BASE_URL = 'https://onboarding.art-code.team/api/test/v1/search/';

export const getSelectDataTerms = async () => {
  const response = await axios.get(`${BASE_URL}terms`);

  return response.data;
};

export const getSelectDataBrandsTerms = async () => {
  const response = await axios.get(`${BASE_URL}brands_terms`);

  return response.data;
};

export const getSelectDataStyles = async () => {
  const response = await axios.get(`${BASE_URL}styles`);

  return response.data;
};
