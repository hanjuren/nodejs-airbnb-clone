const express= require('express');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const {isLoggedIn} = require('./middlewares');
const { Host, Image, User, Review, Reservation } = require('../models');

const router = express.Router();

// 숙소 업로드 페이지 
router.get('/', (req, res) => {
    console.log(req)
    res.render('hosting', { title: "호스트" });
});

// 호스트 신청 페이지
router.get('/apply', isLoggedIn, (req, res) => {
    res.render('hostapply', { title: "호스트" });
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

            //res.render('hosts', {hosts, count, city});
            res.json({hosts});
        }
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 게시글 상세 가져오기
router.get('/:hostid', async (req, res, next) => {
    try{
        const host = await Host.findOne({
            where: {id: req.params.hostid},
            include: [
                {
                    model: User,
                    attributes: ['name', 'nickname', 'id'],
                }, {
                    model: Image,
                    limit: 5,
                },
                {
                    model: Review,
                    include: [
                        {
                            model: User,
                            attributes: ['name'],
                        },
                        {
                            model: Reservation,
                            attributes: ['checkIn', 'checkout'],
                        },
                    ],
                    limit: 6,
                },  
            ],
        });
        //res.render('hostinfo', {host});
        res.json({data: host});
    }catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;