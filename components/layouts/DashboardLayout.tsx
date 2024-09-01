"use client";
import { RootState } from "#/lib/store";
import { useAppSelector } from "#/lib/storeHooks";
import Image from "next/image";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { data } = useAppSelector((state: RootState) => state.auth);
  return (
    <div className="container">
      <div className="flex items-center justify-between bg-white px-5 py-3 shadow-lg">
        <div className="flex items-center gap-3 rounded px-3 py-2 shadow-lg">
          <Image
            src={data?.avatar ?? "https://i.pravatar.cc/50"}
            alt=""
            width={50}
            height={50}
            className="rounded-full"
          />
          <p>{data?.email}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
