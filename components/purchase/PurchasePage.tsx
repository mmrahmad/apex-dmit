"use client";

import React from "react";
import Table from "../ui/Table";
import { ColumnDef } from "@tanstack/react-table";

const PurchasePage = () => {
  const defaultColumns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      cell: (info) => info.getValue(),
      header: () => <span>Role</span>,
    },
    {
      accessorKey: "key",
      cell: (info) => info.getValue(),
      header: () => <span>Role Key</span>,
    },
    {
      accessorKey: "is_active",
      cell: (info) =>
        info.getValue() ? (
          <span className="text-green-500">Active</span>
        ) : (
          <span className="text-red">Inactive</span>
        ),
      header: () => <span>Status</span>,
    },
  ];
  return <Table columns={defaultColumns} data={[]} />;
};

export default PurchasePage;
