const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User = require('../models/user');

module.exports = () => {
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID, // 카카오 시크릿키
        callbackURL: "http://localhost:1210/auth/kakao/callback", // 카카오 콜백 URL
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            const exUser = await User.findOne({
                where: { snsId: profile.id, provider: 'kakao' },
            });
            if (exUser) {  // 카카오로 가입된 정보가 있을때
                done(null, exUser);
            } else { // 카카오로 가입된 정보가 없을때
                const newUser = await User.create({
                    email: profile._json.kakao_account.email,
                    name: profile.displayName,
                    nickname: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
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
