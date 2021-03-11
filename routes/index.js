const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('main', { title: "노드연습하기" });
});

module.exports = router;