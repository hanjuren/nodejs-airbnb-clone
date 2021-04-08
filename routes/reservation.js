const express = require('express');
const {isLoggedIn} = require('./middlewares');
const { Host, Reservation, User } = require('../models');
const dateFormat = require('dateformat');
const sequelize = require('sequelize');
const Op = sequelize.Op;


const router = express.Router();

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

module.exports = router;