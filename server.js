import path from 'path';
import express from 'express';
import router from './routes/router.js';
import fetch from './routes/fetchdata.mjs';
import {API_KEY , API_URL} from './routes/fetchdata.mjs';

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('views', 'views')
app.set('view engine', 'ejs');
// app.use('/', express.static(__dirname + '/'));


app.use('/', router);


const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));


