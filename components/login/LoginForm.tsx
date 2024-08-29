"use client";

import { InputText } from "#/components/form";
import { Button } from "#/components/ui";
import type { LoginFormValues } from "#/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

// =======> Main Function <======= //
const LoginForm = () => {
  // ................ SCHEMA ................ //
  const schema = Yup.object().shape({
    email: Yup.string().trim().email().required(),
    password: Yup.string().trim().required(),
  });

  // ................ HOOKS ................ //
  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: yupResolver(schema),
  });

  // ................ ACTIONS ................ //
  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    console.log(data);
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
      <Button type="button" className="mt-4">
        Sign in
      </Button>
    </form>
  );
};

export default LoginForm;
