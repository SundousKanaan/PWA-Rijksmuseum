const express = require('express');
const router = express.Router();

// my router

router.get('/', (req,res) => {
    res.send("user list");
})

router.get('/new', (req,res) => {
    const id = `${req.params.id}`;
    res.send(`user new form ${id}`);
})

module.exports = router