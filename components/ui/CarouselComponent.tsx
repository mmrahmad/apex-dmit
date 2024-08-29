"use client";

import React from "react";
import Carousel, { ResponsiveType } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// =====> Types & Interfaces <===== //
interface Props {
  slides: React.ReactNode[];
  responsive?: ResponsiveType;
}

// =======> Main Function <======= //
const CarouselComponent: React.FC<Props> = ({ slides, responsive = {} }) => {
  const defaultResponsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <Carousel responsive={{ ...defaultResponsive, ...responsive }}>
      {slides}
    </Carousel>
  );
};

export default CarouselComponent;
