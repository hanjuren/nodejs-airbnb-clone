const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Host, Reservation, Image } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

router.get('/', (req, res) => {
    res.render('main', { title: "Airbnb Clone" });
});

router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: "회원가입" });
});

router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', { title: "로그인" });
});

router.get('/host', isLoggedIn, (req, res) => {
    res.render('hosting', { title: "호스트" });
});

router.get('/host/apply', isLoggedIn, (req, res) => {
    res.render('hostapply', { title: "호스트" });
});

router.get('/userinfo', isLoggedIn, async (req, res, next) => {
    try {
        const UserReservation = await Reservation.findAll({
            where: {
                UserId: req.user.id,
            },
            include: {
                model: Host,
                attributes: ['title', 'hostaddress'],
                include: {
                    model: Image,
                    attributes: ['src'],
                },
            },
            order: [['id', 'DESC']],
        });
        res.render('userinfo', {title: "내정보", UserReservation});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});




module.exports = router;