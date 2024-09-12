import React from "react";
import { Carousel } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <Carousel interval={3000} pause={false}>
          <Carousel.Item>
            <img
              src="/header_img3.png"
              alt="First slide"
              className="d-block w-100 carousel-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="/header_img4.png.jpg"
              alt="Second slide"
              className="d-block w-100 carousel-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="/header_img2.jpg"
              alt="Third slide"
              className="d-block w-100 carousel-image"
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
};

export default Header;
