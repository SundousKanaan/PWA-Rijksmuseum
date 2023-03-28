import path from 'path';
import express from 'express';
import router from './routes/router.js';
import fetch from './routes/fetchdata.mjs';
import {API_KEY , API_URL} from './routes/fetchdata.mjs';

const app = express();
// Configureer de app om JSON-gegevens te kunnen ontvangen en interpreteren
app.use(express.json());

// Configureer de app om URL-gecodeerde gegevens te kunnen ontvangen en interpreteren
app.use(express.urlencoded({extended: true}));

// Configureer de app om statische bestanden te kunnen serveren vanuit de 'public' map
app.use(express.static("public"));

// Configureer de 'views' map als de directory voor alle weergavebestanden (views)
app.set('views', 'views')

// Configureer de 'ejs' module als de view engine voor de app
app.set('view engine', 'ejs');

const __dirname = path.resolve();
// app.use(express.static(__dirname + 'public')); // Hier zit bijvoorbeeld css in

app.use('/', express.static(__dirname + '/'));

app.use('/', router);


const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));


