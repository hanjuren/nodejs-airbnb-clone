# 에어비앤비 클론 코딩

**Notion**. https://www.notion.so/c622c8c322d9415a9c7c097123434c63

### 프로젝트 구성 및 계획
Node.js 기반 express를 사용하여 백엔드 서버를 구축하였고 Nunjucks 템플릿 엔진을 통해 화면을 구성하였습니다.  
Node 교과서 [저자: 조현영(제로초)] 서적과 강의를 학습하며 강의를 기반하여 실습을 진행하기 위해 기획하였으며 클론 코딩 과정에서 기억에 남고 어려웠던 부분들에 대해서는  
[개인 블로그](https://hanjuren.github.io/categories/express/)를 통해 기록해왔습니다.

> 프로젝트에 사용한 기술 스택
* Node.js (v.14.*)
* express
* sequelize
* mysql2
* express-session
* passport
* passport-local , kakao, facebook, naver
* multer
* dotenv
* morgan
* nodemon

> 데이터베이스
* Mysql

### 프로젝트 구조
* views : Front view
* public : css
* uploads : Upload Image
* routes : express Router
  * auth : 유저 인증
  * favorites : 숙소 찜 목록 관리
  * host : 숙소 관련 라우터
  * post : 숙소 업로드
  * review : 리뷰 관련 라우터
  * reservation : 숙소 예약 관련 라우터
* models : 데이터베이스 모델 관리

> ERD
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/b9663c4f-1780-447c-a981-1b64134fcb76/ERD.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20211023%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211023T080230Z&X-Amz-Expires=86400&X-Amz-Signature=bfd7f37168af5a239a28ab66697a5532c023ebb21d1a280521cbc4cb2e6e22d4&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22ERD.png%22)

> REST API
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
- [x] "/post/reservationChecking/:hostId" => 숙소 예약확인 처리
- [x] "/post/reservation/:hostId" => 숙소 예약 처리 

## PUT
- [x] "/auth/hostapply" => 호스트 신청 처리

---