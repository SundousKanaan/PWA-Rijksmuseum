const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'hbs' )

const userRouter = require('./routes/objects.js')
app.use('/#object', userRouter)
app.listen(3000);