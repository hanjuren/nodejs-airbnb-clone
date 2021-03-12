const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

router.get('/', (req, res, next) => {
    res.render('main', { title: "노드연습하기" });
});

router.get('/join', (req, res, next) => {
    res.render('join', { title: "회원가입" });
});

router.get('/login', (req, res, next) => {
    res.render('login', { title: "로그인" });
});

module.exports = router;