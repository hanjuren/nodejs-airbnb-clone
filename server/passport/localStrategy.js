const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
    // passport.authenticate('local' ...에서이동해서  밑의 로직이 실행된다.
    passport.use(new LocalStrategy({
        
        usernameField: 'email',  // req.body.email 필드와 req 값이 일치해야됨
        passwordField: 'password',  // req.body.password 
    }, async (email, password, done) => {
        try {
            const exUser = await User.findOne({ where: {email} }); // 이메일이 있나 확인
            if(exUser){ // 이메일이 있다면
                const result = await bcrypt.compare(password, exUser.password); // 받아온 비번이랑 디비 비번이랑 비교
                if(result) { // 비밀번호 일치
                    done(null, exUser);
                } else { // 비밀번호 다름
                    done(null, false, { message: '비밀번호가 일치하지 않습니다.'});
                }
            } else { // 가입된 이메일이 없다면
                done(null, false, { message: '가입되지 않은 회원입니다.'});
            }
            // done함수 호출 후 passport.authenticate 나머지 실행
        } catch (error) {
            console.log(error);
            done(error);
        }
    }));
};