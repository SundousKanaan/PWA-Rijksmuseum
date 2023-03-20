import { API_URL, API_KEY} from './variables.js';
import { errorscreen } from './display.js';
import { TOP10 , headerfotos , get_details, getZoekenData} from './data.js';

export async function fetchData(API_URL, API_KEY) {
  try{
    const response1 = await fetch(API_URL);
    const data1 = await response1.json();
    
    return data1;
  } 
  catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function fetchZoekURL(API_URL,zoeken) {
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


export async function fetchObjectDetails(objectNumber) { 
  try{
    const objectDetails_URL = `https://www.rijksmuseum.nl/api/nl/collection/${objectNumber}?&key=${API_KEY}&ps=1000`;
    const res = await fetch(objectDetails_URL)
    const data = res.json()
    return data
  } catch (error) {
    throw error;
  }
}


export async function fetchTypeData(searchQuery) { 

  try{
    const objectDetails_URL = `${API_URL}&type=${searchQuery}`;
    console.log(objectDetails_URL);
    const res = await fetch(objectDetails_URL)
    const data = res.json();
    return data

    console.log(data);
  } catch (error) {
    throw error;
  }
}



















// export {fetchData, fetchObjectDetails, fetchZoekURL};




    // const API_URL = `https://www.rijksmuseum.nl/api/nl/collection/${id}?&key=${API_KEY}&ps=1000&${type}&${artist}&${title}`;

    // const data = await fetch(API_URL)
    //   .then(response => response.json())
    //   .then(data => {
  
    //     const artObjectsCount = data.artObjects.length;
    //     console.log("data artObjects length is", artObjectsCount, data.artObjects);
  
    //     // erray van mijn elementen
    //     // const artObjectsErray = data.artObjects.map(artObject => 
    //     //   [(artObject.title) , (artObject.id) , (artObject.webImage.url) , (artObject.principalOrFirstMaker) , (artObject.longTitle)]);
  
    //     //   console.log(artObjectsErray.slice(0,3));
    //     // console.log(artObjectsErray);
  
    //     // const API_schilderijen_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=100&&type=schilderij`;
    //     // fetch(API_schilderijen_URL)
    //     //   .then(response => response.json())
    //     //   .then(data => {
    //     //     console.log(data.artObjects);
  
    //     //     headerfotos(data);
    //     //   })
  
    //     TOP10(data);
        
    //   })