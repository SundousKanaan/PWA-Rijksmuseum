import path from 'path';
import express from 'express';
import router from './routes/router.js';

const app = express();
app.use(express.json());                        // Configureer de app om JSON-gegevens te kunnen ontvangen en interpreteren
app.use(express.urlencoded({extended: true}));  // Configureer de app om URL-gecodeerde gegevens te kunnen ontvangen en interpreteren
app.use(express.static("public"));              // Configureer de app om statische bestanden te kunnen serveren vanuit de 'public' map
app.set('views', 'views')                       // Configureer de 'views' map als de directory voor alle weergavebestanden (views)
app.set('view engine', 'ejs');                  // Configureer de 'ejs' module als de view engine voor de app

app.use('/', router);

const port = 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));


