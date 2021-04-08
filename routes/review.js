const express = require('express');
const { Reservation } = require('../models');
const dateFormat = require('dateformat');
const {isLoggedIn} = require('./middlewares');



const router = express.Router();

router.get('/', (req, res) => {
    res.render('review');
});

router.get('/checking', isLoggedIn, async (req, res, next) => {
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

module.exports = router;