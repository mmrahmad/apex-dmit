"use client";

import { InputText } from "#/components/form";
import { Button } from "#/components/ui";
import type { LoginFormValues } from "#/types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

// =======> Main Function <======= //
const LoginForm = () => {
  // ................ STATES ................ //
  const [isLoading, setIsLoading] = useState(false);

  // ................ SCHEMA ................ //
  const schema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .trim()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  // ................ HOOKS ................ //
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  // ................ ACTIONS ................ //
  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://devapi.propsoft.ai/interview/login",
        data,
      );
      console.log({ response });

      if (response.status >= 200 && response.status <= 300) {
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        label="Email address"
        name="email"
        control={control}
        isRequired
      />
      <InputText
        label="Password"
        name="password"
        type="password"
        control={control}
        isRequired
      />
      <Button
        type="button"
        isLoading={isLoading}
        className="mt-4 px-7 py-3 font-semibold"
      >
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
