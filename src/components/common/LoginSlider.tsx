import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";

function LoginSlider() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: any, e: any) => {
    setIndex(selectedIndex);
  };

  const imageSrc = [
    {
      src: image1,
      name: "Slide One",
    },
    {
      src: image2,
      name: "Slide Two",
    },
    {
      src: image3,
      name: "Slide Three",
    },
    {
      src: image4,
      name: "Slide Four",
    },
    {
      src: image5,
      name: "Slide Five",
    },
    {
      src: image6,
      name: "Slide Six",
    },
  ];

  let carouselItems: any = [];

  imageSrc.forEach((each: any, index: any) => {
    carouselItems.push(
      <Carousel.Item key={index}>
        <img className="w-100 bestSliderImage" src={each.src} alt={each.name} />
      </Carousel.Item>
    );
  });

  return (
    <Carousel fade controls={false} activeIndex={index} onSelect={handleSelect}>
      {carouselItems}
    </Carousel>
  );
}

export default LoginSlider;
