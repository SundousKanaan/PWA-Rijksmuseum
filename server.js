import express from 'express';
import router from './routes/objects.js';
import fetch from './routes/fetchdata.mjs';
// import {longRunningProcess} from './routes/display.mjs';
import {API_KEY , API_URL} from './routes/fetchdata.mjs';

const app = express();

app.use(express.static("public"));
app.set('views', 'views')
app.set('view engine', 'ejs');

// home page
app.get('/', async(req, res) => {
    console.log("Hi index");
    try {
        // longRunningProcess();
        const data = await fetch.fetchData( API_URL, API_KEY);
        // res.json(data);
        res.render('index' , {data: data , object: "/object/", dataDetail:undefined});
        console.log("fetch" , data)

      } catch (error) {
        res.status(500).send(error.message);
      }
})

app.use('/object', router);

const port = 4000;
app.listen(port, () => console.log(`Server listening on port ${port}`));



// app.use('/object', router);
// app.listen(3000);


