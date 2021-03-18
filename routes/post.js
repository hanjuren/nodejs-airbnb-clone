const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Host = require('../models/host');
const Image = require('../models/image');
const sequelize = require("sequelize");
const Op = sequelize.Op;

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

router.post('/host', upload.array('img'), async (req, res, next) => {
    const hostaddress = req.body.firstCity.concat(" ", req.body.middleCity," ", req.body.hostaddress);
    //const re = /\r\n/g;
    //const hostinfo = req.body.hostinfo.replace(re, `<br>`);
    //console.log(req.body.firstCity);
    //console.log(req.files);
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



router.get('/city', async (req, res, next) => {
    console.log(req.query.city); 
    try {
        let pageNum = req.query.pagenum; // 요청 페이지 넘버
        let offset = 0;

        if(pageNum > 1){
            offset = 2 * (pageNum - 1);
        }
        
        const hosts = await Host.findAll({
            where: {
                city: {
                    [Op.like]: "%" + req.query.city + "%"
                },
            },
            include: {
                model: Image,
                attributes: ['src'],
            },
            order: [['id', 'DESC']],
            offset: offset,
            limit: 2,

        });
        const count = await Host.count({
            where: {
                city: {
                    [Op.like]: "%" + req.query.city + "%"
                },
            },
        });
        console.log(count);
        const city = req.query.city;
        //res.json({ success: true, hosts });
        res.render('hosts', {hosts, count, city});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;