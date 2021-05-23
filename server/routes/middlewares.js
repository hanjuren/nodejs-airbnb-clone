const {User, Reservation } = require('../models');
// 로그인 상태를 조회해서 라우터 접근 설정.
// page라우터에서 사용..
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        res.json({message: "로그인 필요"});
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/`);
    }
};

// 리뷰 작성 페이지 권한 확인
exports.reservationUserCheck = async(req, res, next) => {
    console.log(req.query.reservationId);
    try {
        const exuser = await Reservation.findOne({
            where: { id: req.query.reservationId },
            attributes: ['UserId'],
        });
        if(exuser.UserId === req.user.id) {
            next();
        } else {
            res.redirect('/');
        }
    } catch(error) {
        next(error);
    }
};