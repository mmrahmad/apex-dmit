"use client";

import React, { useState } from "react";
import Table from "../ui/Table";
import { ColumnDef } from "@tanstack/react-table";
import { Button, Modal } from "../ui";
import purchaseMockData from "#/__MOCK__/purchase.json";

const PurchasePage = () => {
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
  const onSave = () => {};
  return (
    <div>
      <div className="flex items-center justify-between p-5">
        <h1 className="text-3xl text-primary">Material Purchase</h1>
        <Button onClick={() => setIsModalOpen(true)}>
          Add Material Purchase
        </Button>
      </div>
      <Modal
        open={isModalOpen}
        title="Material Purchase"
        onSave={onSave}
        onClose={onClose}
      >
        <Table
          columns={defaultColumns}
          data={purchaseMockData.material_purchase}
        />
      </Modal>
      <Table
        columns={defaultColumns}
        data={purchaseMockData.material_purchase}
      />
      ;
    </div>
  );
};

export default PurchasePage;
