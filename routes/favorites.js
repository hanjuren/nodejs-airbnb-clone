const express = require('express');
const {Favorite} = require('../models');
const {isLoggedIn} = require('./middlewares');
const router = express.Router();

router.put('/add/:hostId', isLoggedIn, async (req, res, next) => {
    try {
        const exData = await Favorite.findOne({
            where: {
                UserId: req.user.id,
                HostId: req.params.hostId
            }
        });
        if(exData) {
            res.json({success: false, message: '이미 즐겨찾기 목록에 추가하셨군요!!!'});
        } else {
            await Favorite.create({
                UserId: req.user.id,
                HostId: req.params.hostId,
            });
            res.json({success: true, message: '즐겨찾기 추가 완료'});
        }
    } catch(error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;