const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

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

router.post('/login', async(req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) { // 서버 에러일경우
            console.error(authError);
            return next(authError);
        }
        if(!user) { // 로그인이 실패한 경우
            return res.json({loginsuccess: false, message: `${info.message}` });
        }
        return req.login(user, (loginError) => {
            if(loginError) { // 에러가 있었다면
                console.log(loginError);
                return next(loginError);
            }
            
            return res.json({loginsuccess: true, message: "로그인 성공!!."});
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 넣어준다.
});

module.exports = router;