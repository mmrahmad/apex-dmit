"use client";

import { RootState } from "#/lib/store";
import { useAppSelector } from "#/lib/storeHooks";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { Button, Loader, Modal } from "../ui";
import Table from "../ui/Table";
import CreatePurchaseModal from "./CreatePurchaseModal";
import axios, { AxiosResponse } from "axios";
import { log } from "console";
import { MaterialPurchaseResponseInterface } from "#/types";
import { format } from "date-fns/format";

const PurchasePage = () => {
  const { data } = useAppSelector((state: RootState) => state.auth);

  const [materialPurchaseData, setMaterialPurchaseData] =
    useState<MaterialPurchaseResponseInterface>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      cell: (info) =>
        info.getValue() && format(info.getValue() as string, "dd MMM, yyyy"),
      header: () => <span>TRANSACTION</span>,
    },
  ];

  const onClose = () => {
    setIsModalOpen(false);
  };

  const fetchData = async (
    url: string = "https://devapi.propsoft.ai/api/auth/interview/material-purchase",
  ) => {
    setIsLoading(true);
    try {
      const response = await axios.get<MaterialPurchaseResponseInterface>(url, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      });
      setMaterialPurchaseData(response.data);
    } catch (error) {
      console.error({ error });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div>
      <div className="flex flex-col items-center justify-between p-5 md:flex-row">
        <h1 className="text-3xl text-primary">Material Purchase</h1>
        <Button className="py-4" onClick={() => setIsModalOpen(true)}>
          Add Material Purchase
        </Button>
      </div>
      <Modal open={isModalOpen} title="Material Purchase" onClose={onClose}>
        <CreatePurchaseModal onClose={onClose} refetch={fetchData} />
      </Modal>
      <Table
        columns={defaultColumns}
        data={materialPurchaseData?.material_purchase_list?.data || []}
        pagination={materialPurchaseData?.material_purchase_list?.links}
        fetchData={fetchData}
      />
    </div>
  );
};

export default PurchasePage;
