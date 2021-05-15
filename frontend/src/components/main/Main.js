import React from 'react';

const Main = () => {
  return (
    <>
    <div className="banner">
      <div className="banner__info">
          <h3>호스트 여러분이 있기에 가능합니다.</h3>
      </div>
    </div>

    <div className="city__place">
      <section>도시별 여행지 둘러보기</section>
        <div className="city__info">
          <div className="city" id="서울">
            <img src="https://a0.muscache.com/im/pictures/71e23854-a3c7-491c-b715-6e86233a293f.jpg?im_q=medq&im_w=240" alt="" />
              <p>서울 특별시</p>
          </div>
          <div className="city" id="인천">
              <img src="https://a0.muscache.com/im/pictures/8b318783-723f-4584-9b9b-0eb2c8b6078e.jpg?im_q=medq&im_w=240"alt="" />
              <p>인천 광역시</p>
          </div>
          <div className="city" id="대구">
              <img src="https://a0.muscache.com/im/pictures/6b36a0f9-453f-4d11-974e-0cf164b4d18c.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>대구 광역시</p>
          </div>
          <div className="city" id="대전">
              <img src="https://a0.muscache.com/im/pictures/f98fbb2e-9e10-4514-b4a7-02c467e1da03.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>대전 광역시</p>
          </div>
          <div className="city" id="전주">
              <img src="https://a0.muscache.com/im/pictures/087a8dff-a609-4084-86db-f45051c6f23a.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>전주시</p>
          </div>
          <div className="city" id="강릉">
              <img src="https://a0.muscache.com/im/pictures/926d56aa-8b36-4138-8eae-ad991868b858.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>강릉시</p>
          </div>
          <div className="city" id="부산">
              <img src="https://a0.muscache.com/im/pictures/a161fb95-6875-4aaa-aecd-3a46dead3220.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>부산 광역시</p>
          </div>
          <div className="city" id="제주">
              <img src="https://a0.muscache.com/im/pictures/8340bd19-ee32-4669-8b10-a8ac7e7735d4.jpg?im_q=medq&im_w=240"
                  alt="" />
              <p>제주 특별자치도</p>
          </div>
    </div>

    <div className="category__info">
      <section>여행은 어디에나 살아보는거야</section>
        <div className="category__box">
            <div className="search__category" id="개인숙소">
                <img src="https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480"
                    alt="" />
                <p>집 전체</p>
            </div>
            <div className="search__category" id="펜션">
                <img src="https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480"
                    alt="" />
                <p>펜션 전체</p>
            </div>
            <div className="search__category" id="호텔">
                <img src="https://media.cntraveler.com/photos/5f723c317dadd5092527e64e/16:9/w_2560%2Cc_limit/OneHotelBrooklynBridge-NYC-Hotel-2020-2.jpg"
                    alt="" />
                <p>호텔 전체</p>
            </div>
            <div className="search__category" id="모텔">
                <img src="https://media.cntraveler.com/photos/5a8d7de8a2fdaf4c74bb60ae/16:9/w_2560%2Cc_limit/The-Williamsburg-Hotel_1704_WB_Room410_126.jpg"
                    alt="" />
                <p>모텔 전체</p>
            </div>
            <div className="search__category" id="글램핑">
                <img src="https://a0.muscache.com/im/pictures/7f254627-3922-4880-b8fa-545b8551117e.jpg?im_w=480"
                    alt="" />
                <p>글램핑 전체</p>
            </div>
            <div className="search__category" id="전체">
                <img src="https://media.cntraveler.com/photos/591ca699452a0b1d1cfbec3e/16:9/w_1600%2Cc_limit/hotel-pools-1-Hotel-Brooklyn-Bridge-cr-courtesy.jpg"
                    alt="" />
                <p>모든 숙소</p>
            </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Main;