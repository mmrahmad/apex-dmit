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

const CreatePurchaseModal = () => {
  // ................ STATES ................ //
  const [isLoading, setIsLoading] = useState(false);

  // ................ SCHEMA ................ //
  const schema = Yup.object().shape({
    material_purchase: Yup.array().of(
      Yup.object().shape({
        line_item_name: Yup.string().required("Item name is required"),
        store: Yup.string().required("Store name is required"),
        runners_name: Yup.string().required("Runner's name is required"),
        amount: Yup.number()
          .typeError("Amount must be number value")
          .required("Amount is required"),
        card_number: Yup.number()
          .typeError("Card number must be number value")
          .required("Card number is required"),
        transaction_date: Yup.string().required("Transaction date is required"),
      }),
    ),
  });

  // ................ HOOKS ................ //
  const { control, handleSubmit } = useForm<PurchaseFormValuesInterface>({
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
    console.log(data);
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
      />
      <div className="flex justify-end">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

export default CreatePurchaseModal;
