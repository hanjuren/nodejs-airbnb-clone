const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/join', async (req, res, next) => {
    try {
        const {
            email,
            password,
            name,
            nickname,
            firstNum,
            middleNum,
            lastNum,
        } = req.body;
        console.log(req.body);
        const phone = firstNum + middleNum + lastNum;
        const user = await User.findOne({ where: {email} });
        if(user) {
            return res.status(400).render('join');
        }
        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hash,
            name,
            nickname,
            phone,
        });
        //res.json({ joinsuccess: true, message: "회원가입 성공입니다."});
        return res.status(200).render('main');
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;