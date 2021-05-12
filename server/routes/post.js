const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Host = require('../models/host');
const Image = require('../models/image');
const { isLoggedIn } = require('./middlewares');


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

// 숙소 게시글 업로드
router.post('/', isLoggedIn, upload.array('img'), async (req, res, next) => {
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


module.exports = router;