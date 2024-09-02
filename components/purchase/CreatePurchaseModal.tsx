import React, { useState } from "react";
import FormTable from "../ui/FormTable";
import * as Yup from "yup";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CustomColumnDef,
  MaterialPurchaseInterface,
  PurchaseFormValuesInterface,
} from "#/types";
import { ColumnDef } from "@tanstack/react-table";
import purchaseMockData from "#/__MOCK__/purchase.json";
import { Button } from "../ui";
import axios, { AxiosResponse } from "axios";
import { useAppSelector } from "#/lib/storeHooks";
import { toast } from "react-hot-toast";

const CreatePurchaseModal = () => {
  const { data: authData } = useAppSelector((state) => state.auth);
  // ................ STATES ................ //
  const [isLoading, setIsLoading] = useState(false);

  // ................ SCHEMA ................ //
  const schema = Yup.object().shape({
    material_purchase: Yup.array()
      .of(
        Yup.object().shape({
          line_item_name: Yup.string()
            .max(200, "Item name can not be more than 200 characters")
            .required("Item name is required"),
          store: Yup.string()
            .max(200, "Item name can not be more than 200 characters")
            .required("Store name is required"),
          runners_name: Yup.string()
            .max(200, "Item name can not be more than 200 characters")
            .required("Runner's name is required"),
          amount: Yup.number()
            .typeError("Amount must be number value")
            .required("Amount is required"),
          card_number: Yup.number()
            .typeError("Card number must be number value")
            .required("Card number is required")
            .test(
              "len",
              "The card number used for the purchase. Must be exactly 5 digits",
              (val) => !!val && String(val).length === 5,
            )
            .positive("Must be a positive number")
            .integer("Must be an integer"),
          transaction_date: Yup.string().required(
            "Transaction date is required",
          ),
        }),
      )
      .required("Must contain at least one item"),
  });

  // ................ HOOKS ................ //
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PurchaseFormValuesInterface>({
    defaultValues: {
      material_purchase: [{} as MaterialPurchaseInterface],
    },
    resolver: yupResolver(schema),
  });

  const { fields, append, remove } = useFieldArray({
    name: "material_purchase",
    control,
  });

  const defaultColumns: CustomColumnDef<any>[] = [
    {
      accessorKey: "line_item_name",
      cell: (info) => info.getValue(),
      header: () => <span>ITEMS*</span>,
      inputType: "text",
    },
    {
      accessorKey: "store",
      cell: (info) => info.getValue(),
      header: () => <span>STORE*</span>,
      inputType: "text",
    },
    {
      accessorKey: "runners_name",
      cell: (info) => info.getValue(),
      header: () => <span>{"Runner's Name *"}</span>,
      inputType: "text",
    },
    {
      accessorKey: "amount",
      cell: (info) => info.getValue(),
      header: () => <span>AMOUNT *</span>,
      inputType: "number",
    },
    {
      accessorKey: "card_number",
      cell: (info) => info.getValue(),
      header: () => <span>CARD NO. *</span>,
      inputType: "number",
    },
    {
      accessorKey: "transaction_date",
      cell: (info) => info.getValue(),
      header: () => <span>TRANSACTION DATE *</span>,
      inputType: "date",
    },
  ];

  const onSubmit: SubmitHandler<PurchaseFormValuesInterface> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post<
        PurchaseFormValuesInterface,
        AxiosResponse<any>
      >(
        "https://devapi.propsoft.ai/api/auth/interview/material-purchase",
        data,
        {
          headers: {
            Authorization: `Bearer ${authData?.access_token}`,
          },
        },
      );

      if (
        response.status >= 200 &&
        response.status <= 300 &&
        response.data?.status_code === "1"
      ) {
        toast.success("Successfully created");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormTable
        columns={defaultColumns}
        data={fields}
        control={control}
        namePrefix="material_purchase"
        append={append}
        remove={remove}
        setValue={setValue}
      />
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CreatePurchaseModal;
