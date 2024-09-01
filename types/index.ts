import { number } from "yup";

// ----------------------- Login Page ------------------ //
export type LoginFormValues = {
  email: string;
  password: string;
};

type authorType = {
  name: string;
  designation: string;
  avatar: string;
};

export type TestimonialType = {
  id: number;
  rating: number;
  comment: string;
  author: authorType;
};

export interface AuthUserInterface {
  access_token: string;
  id: number;
  email: string;
  avatar?: string;
}
