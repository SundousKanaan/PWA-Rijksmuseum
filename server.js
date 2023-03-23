import express from 'express';
import router from './routes/objects.js';

const app = express();

app.use(express.static("public"));
app.set('views', 'views')
app.set('view engine', 'ejs');

// home page
app.get('/', (req, res) => {
    console.log("Hi index");
    res.render('index');
});

app.use('/object', router);
app.listen(3000);