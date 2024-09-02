"use client";

import { InputText } from "#/components/form-elements";
import { Button } from "#/components/ui";
import { setUser } from "#/lib/slices/authSlice";
import { useAppDispatch, useAppSelector } from "#/lib/storeHooks";
import type { AuthResponseInterface, LoginFormValues } from "#/types";
import { yupResolver } from "@hookform/resolvers/yup";
import axios, { AxiosResponse } from "axios";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as Yup from "yup";

// =======> Main Function <======= //
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.auth);
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
      const response = await axios.post<
        LoginFormValues,
        AxiosResponse<AuthResponseInterface>
      >("https://devapi.propsoft.ai/api/interview/login", data);

      if (response.status >= 200 && response.status <= 300) {
        const { status_code, status_message, ...rest } = response?.data;

        dispatch(setUser(rest));
        router.push("/purchase");
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (!!data?.access_token) redirect("/purchase");
  }, [data?.access_token]);

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
