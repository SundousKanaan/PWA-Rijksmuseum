// const fetch = require('node-fetch');
import fetch from 'node-fetch';


export const API_KEY = 'BI5yOkPW';
export const API_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=1000`;

const fetchData = async (API_URL, API_KEY) => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data');
  }
};


async function fetchObjectDetails(objectNumber) { 
  try{
    const objectDetails_URL = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?&key=${API_KEY}&ps=1000`;
    const res = await fetch(objectDetails_URL)
    const data = res.json()
    return data
  } catch (error) {
    throw error;
  }
}


async function fetchZoekURL(API_URL,zoeken) {
  const ALLAPI_URL = `${API_URL}&${zoeken}`;

  console.log('fetchZoekURL', ALLAPI_URL);

  try {
    const response = await fetch(ALLAPI_URL);
    const data = await response.json();
    console.log('fetchZoekURL', data);
    return data;
  } catch (error) {
    throw error;
  }
}


// console.log(fetchZoekURL(API_URL, "anoniem"));

export default {
  fetchData,
  fetchObjectDetails,
  fetchZoekURL
};

