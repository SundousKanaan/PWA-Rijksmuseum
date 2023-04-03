import express, { request , response } from 'express';
import fetch from './fetchdata.mjs';
// import loadingstate from "./display.mjs";
import { API_KEY, API_URL } from './fetchdata.mjs';

const router = express.Router();


// home page
router.get('/', async (req, res) => {
  console.log("Hi index");
  try {
    // loadingstate(req, res);

    const data = await fetch.fetchData(API_URL, API_KEY);
    // res.json(data);
    res.render('index', { data: data, object: "/object/", dataDetail: undefined });
    console.log("fetch")

  } catch (error) {
    res.status(500).send(error.message);
  }
})

// offline page page
router.get('/offline', async (req, res) => {
  console.log("Hi offline");
  try {
    res.render('offline');
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.get('/zoekResultaten', async (req, res) => {
  res.render('zoeken');
})

router.post('/zoekResultaten', async (req, res) => {
  console.log("Start the search fetch");
  const data = await fetch.fetchData(API_URL, API_KEY);
  const AllMakersArray = data.artObjects.map(artObject => artObject.principalOrFirstMaker);
  const AllTitlesArray = data.artObjects.map(artObject => artObject.title)
  const AllobjectsNummbers = data.artObjects.map(artObject => artObject.objectNumber)
  let Alltypes = [];
  let Allmaterials = [];

  try {
  for (const objectNumber of AllobjectsNummbers) {
    try {
      const objectDetails = await fetch.fetchObjectDetails(objectNumber);
      Alltypes = Alltypes.concat(objectDetails.artObject.objectTypes);
      Allmaterials = Allmaterials.concat(objectDetails.artObject.materials);
    } catch (error) {
      console.error(error);
    }
  }

  const MakersArray = [...new Set(AllMakersArray)];
  const TitlesArray = [...new Set(AllTitlesArray)];
  const typesArray = [...new Set(Alltypes)];
  const materialsArray = [...new Set(Allmaterials)];

  const searchValue = req.body.search;
  let zoeken = '';

  console.log("klaar met fetch 1");

  if (MakersArray.includes(searchValue)) {
    zoeken = 'involvedMaker=' + searchValue;
    const searchData = await fetch.fetchZoekURL(API_URL, zoeken);
    console.log("klaar met fetch 2");
    console.log("LOOL", searchData.artObjects.webImage.url);
    // res.render('zoeken', { data: searchData.artObjects, searchValue: searchValue, object: "/object/" });

  }
  else if (TitlesArray.includes(searchValue)) {
    zoeken = 'title=' + searchValue;
    const searchData = await fetch.fetchZoekURL(API_URL, zoeken);
    console.log("klaar met fetch 3");
    res.render('zoeken', { data: searchData.artObjects, searchValue: searchValue, object: "/object/" });
  }
  else if (typesArray.includes(searchValue)) {
    zoeken = 'type=' + searchValue;
    const searchData = await fetch.fetchZoekURL(API_URL, zoeken);
    console.log("klaar met fetch 4");
    res.render('zoeken', { data: searchData.artObjects, searchValue: searchValue, object: "/object/" });
  }

  else if (materialsArray.includes(searchValue)) {
    zoeken = 'type=' + searchValue;
    const searchData = await fetch.fetchZoekURL(API_URL, zoeken);
    console.log("klaar met fetch 5");
    res.render('zoeken', { data: searchData.artObjects, searchValue: searchValue, object: "/object/" });
  }
  else {
    searchValue = null;
    res.render('zoeken', { searchValue: searchValue });
  }

  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/object/:objectNumber', async (req, res) => {
  console.log('ik kom hier')

  const objectNumber = req.params.objectNumber
  try {
    const dataDetail = await fetch.fetchObjectDetails(objectNumber);
    console.log('eerste test', dataDetail)
    res.render('object', { data: dataDetail, object: "/object/" });
    // console.log(data.artObject.techniques);

  } catch (error) {
    console.log('tweede test')
    res.status(500).send(error.message);
  }
});

export default router;