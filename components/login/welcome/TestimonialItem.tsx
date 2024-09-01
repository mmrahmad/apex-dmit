import { TestimonialType } from "#/types";
import Image from "next/image";
import React from "react";

interface Props {
  data: TestimonialType;
}

const TestimonialItem: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <div className="mb-5 flex items-center justify-center gap-2 md:justify-start">
        {Array.from({ length: data.rating }).map((_, idx) => (
          <Image
            key={idx}
            src="/images/icons/star.png"
            alt=""
            width={25}
            height={25}
          />
        ))}
      </div>
      <p>{data.comment}</p>
      <div className="mt-5 flex items-center justify-center gap-2 md:justify-start">
        <Image
          src={data.author.avatar}
          alt={data.author.name}
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <h6 className="text-base font-bold">{data.author.name}</h6>
          <p className="text-sm">{data.author.designation}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialItem;
