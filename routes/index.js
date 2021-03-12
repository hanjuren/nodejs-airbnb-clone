const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('main', { title: "노드연습하기" });
});

router.get('/join', (req, res, next) => {
    res.render('join', { title: "회원가입" });
});

module.exports = router;