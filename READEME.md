# 에어비앤비 클론 코딩 해보기

api

## GET
- [x] "/" => main페이지 로드  
- [x] "login" => 로그인 페이지 로드
- [x] "/join" => 회원가입 페이지 로드
- [x] "/host" => 숙소 업로드 페이지 로드
- [x] "/host/apply" => 호스트 신청 페이지 로드
- [x] "/auth/kakao" => 카카오 로그인 요청
- [x] "/auth/kakao/callback" => 카카오 로그인 콜백 라우터
- [x] "/auth/facebook" => 카카오 로그인 요청
- [x] "/auth/facebook/callback" => 카카오 로그인 콜백 라우터
- [x] "/auth/naver" => 카카오 로그인 요청[ ] "/auth/naver/callback" => 카카오 로그인 콜백 라우터
- [x] "/post/city?city=${도시이름}" => 도시별 숙소 페이지 로드
- [x] "/:postid" => 숙소 상세정보 페이지 로드

## POST
- [x] "/auth/join" => 회원가입 처리
- [x] "/auth/login" => 로컬 로그인 처리
- [x] "/post/host" => 숙소 업로드 처리
- [x] "/post/reservation/:postid" => 숙소 예약확인 처리

## PUT
- [x] "/auth/hostapply" => 호스트 신청 처리