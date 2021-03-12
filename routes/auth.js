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
            phone,
        } = req.body;
        console.log(req.body);
        //const phone = firstNum + middleNum + lastNum;
        const user = await User.findOne({ where: {email} });
        if(user) {
            return res.json({ joinsuccess: false, message: "입력하신 이메일로 가입한 계정이 존재합니다..." });
        }
        const hash = await bcrypt.hash(password, 12);
        const newUser = await User.create({
            email,
            password: hash,
            name,
            nickname,
            phone,
        });
        return res.json({ joinsuccess: true, message: "회원가입 성공입니다."});
        // n res.status(200).render('main');
    } catch (error) {
        console.error(error);
        return res.json({ joinsuccess: false, message: "데이터 베이스 오류 입니다 관리자에게 문의 하세요..."});
    }
});

module.exports = router;