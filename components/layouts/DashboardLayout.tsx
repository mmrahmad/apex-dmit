"use client";
import { RootState } from "#/lib/store";
import { useAppSelector } from "#/lib/storeHooks";
import Image from "next/image";
import React, { useEffect, useLayoutEffect } from "react";
import { Loader } from "../ui";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const { data } = useAppSelector((state: RootState) => state.auth);
  useLayoutEffect(() => {
    if (!data?.access_token) redirect("/");
  }, [data?.access_token]);

  if (!data?.access_token) return <Loader />;
  return (
    <div className="container">
      <div className="flex items-center justify-between bg-white px-5 py-3 shadow-lg">
        <div className="flex items-center gap-3 rounded px-3 py-2 shadow-lg">
          <Image
            src={data?.user_data?.avatar ?? "https://i.pravatar.cc/50"}
            alt=""
            width={50}
            height={50}
            className="rounded-full"
          />
          <p>{data?.user_data?.email}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default DashboardLayout;
