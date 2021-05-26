import React from 'react';
import Cityinfo from './Cityinfo';
import Category from './Category';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CityPlace = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  section {
    align-self: flex-start;
    margin-top: 60px;
    font-size: 30px;
    font-weight: 700;
    margin-left: 80px;
  }
`;

const CityCategory = styled.div`
  width: 80%;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr) !important;
  grid-auto-flow: row !important;

  a {
    text-decoration: none;
    color: black;
  }
`;

const CategoryInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  section {
    align-self: flex-start;
    margin-top: 60px;
    font-size: 30px;
    font-weight: 700;
    margin-left: 80px;
  }
`;

const CategoryBox = styled.div`
  width: 80%;
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr) !important;
  grid-auto-flow: row !important;
  padding-bottom: 70px;
  row-gap: 0;
`;

const cityinfo = [
  {
    id: "서울",
    img: "https://a0.muscache.com/im/pictures/71e23854-a3c7-491c-b715-6e86233a293f.jpg?im_q=medq&im_w=240",
    text: "서울 특별시"
  },
  {
    id: "인천",
    img: "https://a0.muscache.com/im/pictures/8b318783-723f-4584-9b9b-0eb2c8b6078e.jpg?im_q=medq&im_w=240",
    text: "인천 광역시"
  },
  {
    id: "대구",
    img: "https://a0.muscache.com/im/pictures/6b36a0f9-453f-4d11-974e-0cf164b4d18c.jpg?im_q=medq&im_w=240",
    text: "대구 광역시"
  },
  {
    id: "전주",
    img: "https://a0.muscache.com/im/pictures/f98fbb2e-9e10-4514-b4a7-02c467e1da03.jpg?im_q=medq&im_w=240",
    text: "전주시"
  },
  {
    id: "부산",
    img: "https://a0.muscache.com/im/pictures/087a8dff-a609-4084-86db-f45051c6f23a.jpg?im_q=medq&im_w=240",
    text: "부산 광역시"
  },
  {
    id: "강릉",
    img: "https://a0.muscache.com/im/pictures/926d56aa-8b36-4138-8eae-ad991868b858.jpg?im_q=medq&im_w=240",
    text: "강릉시"
  },
  {
    id: "제주",
    img: "https://a0.muscache.com/im/pictures/a161fb95-6875-4aaa-aecd-3a46dead3220.jpg?im_q=medq&im_w=240",
    text: "제주 특별 자치도"
  },
  {
    id: "대전",
    img: "https://a0.muscache.com/im/pictures/8340bd19-ee32-4669-8b10-a8ac7e7735d4.jpg?im_q=medq&im_w=240",
    text: "대전 광역시"
  }
];

const searchCategory = [
  {
    id: "개인숙소",
    img: "https://a0.muscache.com/im/pictures/7d82ca14-56e5-4465-8218-dcfa7d69b6ac.jpg?im_w=480",
    text: "집 전체"
  },
  {
    id: "펜션",
    img: "https://a0.muscache.com/im/pictures/36f53e61-db8d-403c-9122-5b761c0e4264.jpg?im_w=480",
    text: "펜션 전체"
  },
  {
    id: "호텔",
    img: "https://media.cntraveler.com/photos/5f723c317dadd5092527e64e/16:9/w_2560%2Cc_limit/OneHotelBrooklynBridge-NYC-Hotel-2020-2.jpg",
    text: "호텔 전체"
  },
  {
    id: "모텔",
    img: "https://media.cntraveler.com/photos/5a8d7de8a2fdaf4c74bb60ae/16:9/w_2560%2Cc_limit/The-Williamsburg-Hotel_1704_WB_Room410_126.jpg",
    text: "모텔 전체"
  },
  {
    id: "글램핑",
    img: "https://a0.muscache.com/im/pictures/7f254627-3922-4880-b8fa-545b8551117e.jpg?im_w=480",
    text: "글램핑 전체"
  },
  {
    id: "전체",
    img: "https://media.cntraveler.com/photos/591ca699452a0b1d1cfbec3e/16:9/w_1600%2Cc_limit/hotel-pools-1-Hotel-Brooklyn-Bridge-cr-courtesy.jpg",
    text: "모든 숙소"
  }
]

const Cityplace = () => {
  return (
    <>
      <CityPlace>
        <section>도시 여행지 둘러보기</section>
        <CityCategory>
          {cityinfo.map((city, index) => (
            <Link key={index} to={`/hosts?city=${city.id}`}>
            <Cityinfo
            id={city.id}
            img={city.img}
            text={city.text}
            key={index}
            />
            </Link>
          ))};
        </CityCategory>
      </CityPlace>
      <CategoryInfo>
        <section>여행은 어디에나 살아보는거야</section>
        <CategoryBox>
        {searchCategory.map((category, index) => (
            <Category
            key={index}
            id={category.id}
            img={category.img}
            text={category.text}
          />
          ))};
        </CategoryBox>
      </CategoryInfo>
    </>
  );
};

export default Cityplace;