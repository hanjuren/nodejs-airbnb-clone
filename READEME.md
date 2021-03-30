# 에어비앤비 클론 코딩 해보기


API 방식
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

---

## DATABASE

User테이블  
* 모델 이름 : User  
* 테이블 이름 : users

사용자의 정보를 가지는 테이블

| Column | Type | Key | Options | Null | Comment |
|:---|:---|:---|:---|:---|:---|
| id | Number | Pk | | true | |
| email | String | | | true | 사용자 이메일 |
| password | String | | bcrypt암호화 | true | 사용자 비밀번호 |
| name | String | | | false | 사용자 이름 |
| nickname | String | | | true | 사용자 닉네임 |
|phone|String| | | true | 사용자 전화번호 |
| provider | String | | defaultValue : 'local' | false | 계정의 종류 |
| snsId | String | | | true | SNS가입시 SNS 아이디 |
| hostAvailability | Boolean | | dafaultValue : 'false' | false | 사용자의 호스트 권한 여부 |

* User모델 관계
  * User모델 1 : N Host모델
  * User모델 1 : N Reservation모델


Host테이블  
* 모델 이름 : Host
* 테이블 이름 : hosts

숙소에 대한 정보를 가지는 테이블

| Column | Type | Key | Options | Null | Comment |
|:---|:---|:---|:---|:---|:---|
| id | Number | Pk | | false | |
| title | String | | | false | 숙소 타이틀 |
| hostaddress | String | | | false | 숙소 주소 전체 |
| city | String | | | false | 숙소 도시 |
| person | String | | | false | 숙소 인원 제한 |
| roominfo_room | String | | | false | 방 갯수 |
| roominfo_bed | String | | | false | 침대 사이즈 정보 |
| roominfo_cook | String | | | false | 취사여부 |
| roominfo_bathroom | String| | | false | 화장실 갯수 |
| hostinfo | String  | | | false | 숙소 상세 설명 |
| UserId | | Fk | | false | 작성한 사용자 아이디 | 

* Host모델 관계
  * Host모델 N : 1 User모델
  * Host모델 1 : N Image모델
  * Host모델 1 : N Reservation모델

Reservation테이블  
* 모델 이름 : Reservation
* 테이블 이름 : reservation

호스트 예약 정보를 가지는 테이블

| Column | Type | Key | Options | Null | Comment |
|:---|:---|:---|:---|:---|:---|
| id | Number | Pk | | false | |
| checkIn | DateOnly | | | false | 체크인 날짜 |
| checkout | DateOnly | | | false | 체크아웃 날짜 |
| reservationUserName | String | | | false | 예약자 이름 |
| reservationPhone | String | | | false | 예약자 전화번호 |
| UserId | | Fk | | false | 예약한 사용자 아이디 |
| HostId | | Fk | | fasle | 예약한 숙소 아이디 |

* Reservation모델 관계
  * Reservation모델 N : 1 User모델
  * Reservation모델 N : 1 Host모델

Image테이블  
* 모델 이름: Image
* 테이블 이름 : images

숙소의 사진정보를 가지는 테이블

| Column | Type | Key | Options | Null | Comment |
|:---|:---|:---|:---|:---|:---|
| id | Number | Pk | | false | |
| src | String | | | false | 숙소의 이미지주소 |
| HostId | | Fk | | false | 이미지의 숙소 아이디 |

* Image모델 관계
  * Image모델 N : 1 Host모델