const express = require('express');
const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs' )

router.get('/', (req,res) => {
    res.render("index");
    res.send("Hi");
})


const userRouter = require('./routes/objects.js')
app.use('/#object', userRouter)
app.listen(3000);