import express from 'express';
import fetch from './fetchdata.mjs';
import {API_KEY , API_URL} from './fetchdata.mjs';

const router = express.Router();



router.get('/:objectNumber', async (req, res) => {
    const objectNumber = req.params.objectNumber
    try {
        // const data = await fetch.fetchData( API_URL, API_KEY);
        const dataDetail = await fetch.fetchObjectDetails(objectNumber);
        // res.json(dataDetail);
        // res.send(dataDetail.artObject.title)
        res.render('object' , {data: dataDetail, object: "/object/"});

      } catch (error) {
        res.status(500).send(error.message);
      }
});

export default router;