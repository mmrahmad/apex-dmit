import React from "react";
import { WelcomeSection } from "./welcome/WelcomeSection";
import FormSection from "./form/FormSection";
import { TestimonialType } from "#/types";

const LoginPage = () => {
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      rating: 5,
      comment:
        "We love Landingfolio! Our designers were using it for their projects, so we already knew what kind of design they want.",
      author: {
        name: "Devon Lane",
        designation: "Co-Founder, Design.co",
        avatar: "https://i.pravatar.cc/50",
      },
    },
  ];
  return (
    <main className="login-page">
      <div className="container grid h-full min-h-screen grid-cols-2 items-center justify-center gap-8">
        <WelcomeSection testimonials={testimonials} />
        <FormSection />
      </div>
    </main>
  );
};

export default LoginPage;
