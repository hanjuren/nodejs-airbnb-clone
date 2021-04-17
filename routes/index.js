const express = require('express');
const dateFormat = require('dateformat');
const sequelize = require("sequelize");
const Op = sequelize.Op;
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Host, Reservation, Image, Review } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });

// 메인페이지 
router.get('/', (req, res) => {
    res.render('main', { title: "Airbnb Clone" });
});
// 회원가입 페이지
router.get('/join', isNotLoggedIn, (req, res) => {
    res.render('join', { title: "회원가입" });
});
// 로그인 페이지
router.get('/login', isNotLoggedIn, (req, res) => {
    res.render('login', { title: "로그인" });
});

// 사용자 정보 페이지
router.get('/userinfo', isLoggedIn, async (req, res, next) => {
    try {
        const newDate = dateFormat(new Date(), "yyyy-mm-dd");
        // 이용 전 숙소 정보
        const UserReservation = await Reservation.findAll({
            where: {
                UserId: req.user.id,
                checkout: {
                    [Op.gt]: newDate,
                },
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
        // 이용이 완료된 숙소 정보
        const ReservationSuccess = await Reservation.findAll({
            where: {
                UserId: req.user.id,
                checkout: {
                    [Op.lt]: newDate,
                },
            },
            include: [
                {
                    model: Host,
                    attributes: ['title', 'hostaddress'],
                    include: {
                        model: Image,
                        attributes: ['src'],
                    },
                },
                {
                    model: Review,
                    attributes: ['id'],
                    
                },
            ],
            order: [['id', 'DESC']],
        });
        res.render('userinfo', {title: "내정보", UserReservation, ReservationSuccess});
    } catch(error) {
        console.error(error);
        next(error);
    }
});
// 로그아웃
router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});




module.exports = router;