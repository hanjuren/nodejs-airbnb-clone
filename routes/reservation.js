const express = require('express');
const {isLoggedIn} = require('./middlewares');
const { Host, Reservation, User } = require('../models');
const dateFormat = require('dateformat');
const sequelize = require('sequelize');
const Op = sequelize.Op;


const router = express.Router();

router.get('/cancle', async (req, res, next) => {
    const reservationId = req.query.reservationId;
    console.log(reservationId);
    try {
        const exUser = await Reservation.findOne({
            where: {id: reservationId}
        });
        
        if(exUser.UserId === req.user.id) {
            await Reservation.destroy({
                where: {
                    id: reservationId,
                },
            });
            res.json({success: true, message: "예약이 취소되었습니다."});
        } else {
            res.json({success: false, message: "해당 예약을 취소할수 없습니다."});
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

// 예약 페이지
router.get('/:hostId', isLoggedIn, async (req, res, next) => {
    try {
        const host = await Host.findOne({
            where: {id: req.params.hostId},
            include: {
                model: User,
                attributes: ['name'],
            },
        });
        res.render('reservation', {host});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//예약 확인
router.post('/reservationChecking/:hostId', async (req, res, next) => {
    const checkInDate = dateFormat(new Date(req.body.checkin), "yyyy-mm-dd");
    const checkOutDate = dateFormat(new Date(req.body.checkout), "yyyy-mm-dd");
    console.log(req.body.checkin);
    try {
        const exReservation = await Reservation.findOne({
            where: { 
                HostId: req.params.hostId,
                [Op.and]: [ // and 연산자
                { 
                    [Op.or]: [ 
                        {checkIn: {[Op.lte]: checkInDate}}, // Reservation.chechIn >= checkIndate 
                        {checkIn: {[Op.lt]: checkOutDate}}, // Reservation.chechIn > checkOutdate 
                    ]
                }, 
                { 
                    [Op.or]: [ 
                        {checkout: {[Op.gt]: checkInDate}}, // Reservation.checkout < checkInDate
                        {checkout: {[Op.gte]: checkOutDate}}, // Reservation.checkout <= checkOutDate
                    ] 
                }, 
            ],
            
        }
        });
        if(exReservation) {
            return res.json({ success: false});
        }
        return res.json({success: true, checkin: checkInDate, checkout: checkOutDate});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 예약 하기
router.post('/:hostId', isLoggedIn, async (req, res, next) => {
    console.log(req.body);
    const {
        checkin,
        checkout,
        userName,
        phone,
    } = req.body;
    try {
        const reservation = await Reservation.create({
            checkIn: checkin,
            checkout,
            reservationUserName: userName,
            reservationPhone: phone,
            UserId: req.user.id,
            HostId: req.params.hostId,
        });
        console.log(reservation);
        res.json({reservationsuccess: true, message: `${checkin} ~ ${checkout} 일정의 예약이 완료되었습니다.`});
    } catch(error) {
        console.error(error);
        next(error);
    }
});

//취소하기

module.exports = router;