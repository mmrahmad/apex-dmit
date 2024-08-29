import React from "react";
import { Carousel } from "#/components/ui";
import { TestimonialType } from "#/types";
import TestimonialItem from "./TestimonialItem";

interface Props {
  testimonials: TestimonialType[];
}

export const WelcomeSection: React.FC<Props> = ({ testimonials }) => {
  return (
    <section className="flex h-full flex-col justify-center bg-[url('/images/bg.svg')] bg-cover bg-no-repeat pl-28 pr-20 text-white">
      <div className="mb-[20vh]">
        <h1 className="leading-tight">Welcome to our community</h1>
        <p className="text-primary-lighter">
          Clarity gives you the blocks & components you need to create a truly
          professional website.
        </p>
      </div>
      <div>
        <Carousel
          slides={testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} data={testimonial} />
          ))}
        />
      </div>
    </section>
  );
};
