// components/CarouselComponent.js
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const CarouselComponent = () => {
  return (
    <Carousel
      showThumbs={false}
      autoPlay={true}
      infiniteLoop={true}
      autoFocus={true}
      showStatus={false}
    >
      <div>
        <Image
          src="/sample.jpg"
          alt="dates"
          width={1200}
          height={400}
        />
      </div>
      <div>
        <Image
          src="/assest/11.jpg"
          alt="dates"
          width={1400}
          height={400}
        />
      </div>
      <div>
        <Image
          src="/assest/2.jpg"
          alt="dates"
          width={1400}
          height={400}
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;