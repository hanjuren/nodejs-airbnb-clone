const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Host = require('../models/host');
const Image = require('../models/image');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const sequelize = require("sequelize");
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Op = sequelize.Op;
const dateFormat = require('dateformat');

const router = express.Router();

try {
    fs.readdirSync('uploads');
} catch (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성 합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
});

// 게시글 업로드
router.post('/host', isLoggedIn, upload.array('img'), async (req, res, next) => {
    const hostaddress = req.body.firstCity.concat(" ", req.body.middleCity," ", req.body.hostaddress);

    try{
        const newHost = await Host.create({
            title: req.body.title,
            hostaddress,
            city: req.body.firstCity,
            person: req.body.person,
            roominfo_room: req.body.room,
            roominfo_bed: req.body.bed,
            roominfo_cook: req.body.cook,
            roominfo_bathroom: req.body.bathroom,
            hostinfo: req.body.hostinfo,
            hosttype: req.body.hosttype,
            UserId: req.user.id,
        });
        for(i=0; i<req.files.length; i++){
            let newImage = await Image.create({
                src: "img/" + req.files[i].filename,
                HostId: newHost.id,
            });
            //console.log(newImage);
        }
        console.log("success");
        res.redirect('/');
    } catch (error) {
        console.log(error);
        next(error);
    }
});


//게시물 가져오기
router.get('/city', async (req, res, next) => {
    
    try {
        let pageNum = req.query.pagenum; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 12 * (pageNum - 1);
        }
        let hosts;
        let count;
        let city;
        let category
        // 도시별 카테고리 선택시
        if(req.query.category && req.query.city) {
            category = req.query.category;
            hosts = await Host.findAll({
                where: {
                    hostaddress: {
                        [Op.like]: "%" + req.query.city + "%"
                    },
                    hosttype: {
                        [Op.like]: "%" + category + "%"
                    },
                },
                include: {
                    model: Image,
                    attributes: ['src'],
                },
                order: [['id', 'DESC']],
                offset: offset,
                limit: 12,
            });
            count = await Host.count({
                where: {
                    city: {
                        [Op.like]: "%" + req.query.city + "%"
                    },
                    hosttype: {
                        [Op.like]: "%" + category + "%"
                    },
                },
            });
            city = req.query.city;
            
            res.render('hosts', {hosts, count, city, category});
        }
        // 전체 도시의 카테고리별
        else if(req.query.category) {
            category = req.query.category;
            if(category === "전체") {
                hosts = await Host.findAll({
                    include: {
                        model: Image,
                        attributes: ['src'],
                    },
                    order: [['id', 'DESC']],
                    offset: offset,
                    limit: 12,
                });
                count = await Host.count({});
                
                res.render('hosts', {hosts, count, category});
            }
            else {
                hosts = await Host.findAll({
                    where: {
                        hosttype: {
                            [Op.like]: "%" + category + "%"
                        },
                    },
                    include: {
                        model: Image,
                        attributes: ['src'],
                    },
                    order: [['id', 'DESC']],
                    offset: offset,
                    limit: 12,
                });
                count = await Host.count({
                    where: {
                        hosttype: {
                            [Op.like]: "%" + category + "%"
                        },
                    },
                });
                
                res.render('hosts', {hosts, count, category});
            }

        }
        // 도시별로만 가져오기
        else {
            hosts = await Host.findAll({
                where: {
                    hostaddress: {
                        [Op.like]: "%" + req.query.city + "%"
                    },
                },
                include: {
                    model: Image,
                    attributes: ['src'],
                },
                order: [['id', 'DESC']],
                offset: offset,
                limit: 12,
    
            });
            count = await Host.count({
                where: {
                    city: {
                        [Op.like]: "%" + req.query.city + "%"
                    },
                },
            });
            if(req.query.city) {
                city = req.query.city;
            } else {
                city = "전체"
            }
            console.log(hosts);
            console.log(count);
            res.render('hosts', {hosts, count, city});
        }
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});
// 예약 페이지
router.get('/reservation/:hostId', isLoggedIn, async (req, res, next) => {
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
router.post('/reservation/:hostId', async (req, res, next) => {
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
// 게시글 상세 가져오기
router.get('/:postid', async (req, res, next) => {
    try{
        const host = await Host.findOne({
            where: {id: req.params.postid},
            include: [
                {
                    model: User,
                    attributes: ['name', 'nickname', 'id'],
                }, {
                    model: Image,
                    limit: 5,
                },  
            ],
        });
        res.render('hostinfo', {host});
        console.log(host);
    }catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;