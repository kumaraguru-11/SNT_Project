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
    >
      <div>
        <Image
          src="/sample.jpg"
          alt="dates"
          className="icon"
          width={1400}
          height={400}
          priority
        />
      </div>
      <div>
        <Image
          src="/assest/11.jpg"
          alt="dates"
          className="icon"
          width={1400}
          height={400}
          priority
        />
      </div>
      <div>
        <Image
          src="/assest/2.jpg"
          alt="dates"
          className="icon"
          width={1400}
          height={400}
          priority
        />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
