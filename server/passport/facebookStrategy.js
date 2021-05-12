const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user');

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID, // 페이스북 클라이언트키
        clientSecret: process.env.FACEBOOK_SECRET, // 페이스북 시크릿키
        callbackURL: "http://localhost:8640/auth/facebook/callback", // 페이스북 콜백 URL
        profileFields: ['id', 'displayName', 'email'], // 페이스북은 가져올 정보를 명시해줘야 한다... 기본으로는 email을 절대 안줌
    }, async (accessToken, refreshToken, profile, done) => {
        
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'facebook' },
            });
            if (exUser) {  // 페이스북으로 가입된 정보가 있을때
                done(null, exUser);
            } else { // 페이스북으로 가입된 정보가 없을때
                const newUser = await User.create({
                    email: profile.emails[0].value,
                    name: profile.displayName,
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: 'facebook',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error(error);
            done(error);
        }
    }
    ));
};