const express = require('express');
const dateFormat = require('dateformat');
const sequelize = require("sequelize");
const Op = sequelize.Op;
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
        const newDate = dateFormat(new Date(), "yyyy-mm-dd");
        console.log(newDate);
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
        res.render('userinfo', {title: "내정보", UserReservation, ReservationSuccess});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

// 리뷰 작성 가능 여부
router.get('/review/checking', isLoggedIn, async (req, res, next) => {
    const reservationId = req.query.reservationId;
    try {
        const exReservation = await Reservation.findOne({
            where: {
                id: reservationId,
            }
        });
        if(exReservation.UserId === req.user.id) {
            const reviewCheck = await Reservation.findOne({
                where: {
                    id: exReservation.id,
                },
                attributes: ['checkout'],
            });
            const newDate = dateFormat(new Date(), "yyyy-mm-dd");
            const elapsedMSec = new Date(newDate) - new Date(reviewCheck.checkout);
            const elapsedDay = elapsedMSec / 1000 / 60 / 60 / 24;
            if(elapsedDay > 7) {
                res.json({ success: false, message: "리뷰 작성 기간이 지났습니다...."});
            } else {
                res.json({ success: true, message: "리뷰는 호스트에게 도움이 됩니다. 작성하시겠습니까?"});
            }
        } else {
            res.json({ success: false , message: "리뷰를 작성할 권한이 없습니다."});
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

router.get('/logout', isLoggedIn, (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});




module.exports = router;