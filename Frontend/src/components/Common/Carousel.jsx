import React, { useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { styled } from "styled-components";

const PofolImg = styled.img`
  width: 120px;
  margin-bottom: 10px;
`;
const SwipeToSlide = ({items}) => {
  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: Math.min(3, items.length),
    swipeToSlide: true,
    afterChange: function (index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    },
  };

  return (
    <Slider {...settings}>
      {items.map((item, index) => (
        <div key={index}>
          <PofolImg src={item} />
        </div>
      ))}
    </Slider>
  );
};

export default SwipeToSlide;
