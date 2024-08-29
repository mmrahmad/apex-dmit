import React from "react";
import LoginForm from "./LoginForm";

const FormSection = () => {
  return (
    <section className="pl-20 pr-28">
      <div className="mb-[10vh]">
        <h2 className="text-gray-900">Welcome back!</h2>
        <p>
          Clarity gives you the blocks and components you need to create a truly
          professional website.
        </p>
      </div>
      <LoginForm />
    </section>
  );
};

export default FormSection;
