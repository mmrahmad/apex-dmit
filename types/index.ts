import { ColumnDef } from "@tanstack/react-table";
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

export interface ResponseStatusInterface {
  status_code: string;
  status_message: string;
}

export interface UserInterface {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface AuthUserInterface {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
  user_data: UserInterface;
}

export interface AuthResponseInterface
  extends ResponseStatusInterface,
    AuthUserInterface {}

export interface MaterialPurchaseInterface {
  line_item_name: string;
  store: string;
  runners_name: string;
  amount: number;
  card_number: number;
  transaction_date: string;
}
export interface PurchaseFormValuesInterface {
  material_purchase: MaterialPurchaseInterface[];
}

export type CustomColumnDef<T> = ColumnDef<T> & {
  accessorKey: string;
  inputType?: "text" | "number" | "date";
};

export interface MaterialPurchase {
  id: number;
  line_item_name: string;
  store: string;
  runners_name: string;
  amount: number;
  card_number: string;
  transaction_date: string;
}

export interface PaginationLinksInterface {
  url: null | string;
  label: string;
  active: boolean;
}
export interface MaterialPurchaseResponseInterface
  extends ResponseStatusInterface {
  material_purchase_list: {
    current_page: number;
    data: MaterialPurchase[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLinksInterface[];
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
  };
}
