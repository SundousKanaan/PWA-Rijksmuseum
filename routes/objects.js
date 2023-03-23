import express from 'express';
// import { article } from './variables/variables.js';


const router = express.Router();
// const article = document.querySelector('main > article');
// console.log(article);



router.get('/open_image', (req, res) => {
    res.send("Hallo world");
    // console.log(article);
    // article.classList.add('openimg');

    // const id = `${req.params.id}`;
    // res.send(`user new form ${id}`);
});

export default router;