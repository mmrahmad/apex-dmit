"use client";

import { RootState } from "#/lib/store";
import { useAppSelector } from "#/lib/storeHooks";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button, Modal } from "../ui";
import Table from "../ui/Table";
import CreatePurchaseModal from "./CreatePurchaseModal";
import axios from "axios";
import { log } from "console";

const PurchasePage = () => {
  const { data } = useAppSelector((state: RootState) => state.auth);

  const [materialPurchaseData, setMaterialPurchaseData] = useState<any>();
  const [refetch, setRefetch] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultColumns: ColumnDef<any>[] = [
    {
      accessorKey: "line_item_name",
      cell: (info) => info.getValue(),
      header: () => <span>ITEMS</span>,
    },
    {
      accessorKey: "store",
      cell: (info) => info.getValue(),
      header: () => <span>STORE</span>,
    },
    {
      accessorKey: "runners_name",
      cell: (info) => info.getValue(),
      header: () => <span>{"Runner's Name"}</span>,
    },
    {
      accessorKey: "amount",
      cell: (info) => info.getValue(),
      header: () => <span>AMOUNT</span>,
    },
    {
      accessorKey: "card_number",
      cell: (info) => info.getValue(),
      header: () => <span>CARD NO.</span>,
    },
    {
      accessorKey: "transaction_date",
      cell: (info) => info.getValue(),
      header: () => <span>TRANSACTION</span>,
    },
  ];

  const onClose = () => setIsModalOpen(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://devapi.propsoft.ai/api/auth/interview/material-purchase",
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      );
      console.log({ response });
    } catch (error) {
      console.error({ error });
    }
  };

  useEffect(() => {
    fetchData();
  }, [refetch]);

  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl text-primary">Material Purchase</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Material Purchase
        </Button>
      </div>
      <Modal open={isModalOpen} title="Material Purchase" onClose={onClose}>
        <CreatePurchaseModal />
      </Modal>
      <Table columns={defaultColumns} data={[]} />
    </div>
  );
};

export default PurchasePage;
