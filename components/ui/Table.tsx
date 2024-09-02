"use client";

import { PaginationLinksInterface } from "#/types";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";

interface Props {
  columns: ColumnDef<any>[];
  data: any[];
  pagination?: PaginationLinksInterface[];
  fetchData?: (url: string) => void;
}

const Table: React.FC<Props> = ({
  columns: defaultColumns,
  data,
  pagination,
  fetchData,
}) => {
  const [columns] = React.useState<typeof defaultColumns>(() => [
    ...defaultColumns,
  ]);

  // Create the table and pass your options
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Manage your own state
  const [state, setState] = React.useState(table.initialState);

  // Override the state managers for the table to your own
  table.setOptions((prev) => ({
    ...prev,
    state,
    onStateChange: setState,
    // These are just table options, so if things
    // need to change based on your state, you can
    // derive them here

    // Just for fun, let's debug everything if the pageIndex
    // is greater than 2
    debugTable: state.pagination.pageIndex > 2,
  }));
  return (
    <div className="p-2">
      <table className="w-full overflow-x-auto">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="lg:px-7.5 rounded-t bg-primary/60 px-5 py-4 2xl:px-11"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border-x border-x-white/30 px-2 py-3 text-center font-medium text-white"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIdx) => (
            <tr
              key={row.id}
              className="border-b border-b-zinc-300 even:bg-primary/10"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="dark:text-bodydark px-2 py-3 text-center text-[#637381]"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className="mb-3">
              {footerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-2" />
      <div className="mt-2 flex items-center justify-center gap-2">
        {pagination &&
          pagination?.length > 0 &&
          pagination?.map((item, index) => (
            <button
              key={index}
              className={`rounded border p-1 px-3 ${!item.url ? "cursor-not-allowed text-slate-300" : "hover:bg-primary hover:text-white"} ${item.active ? "bg-primary text-white" : ""} transition-all duration-150`}
              onClick={() => fetchData && item.url && fetchData(item.url)}
              disabled={!item.url}
            >
              <span dangerouslySetInnerHTML={{ __html: item.label }}></span>
            </button>
          ))}
      </div>
    </div>
  );
};

export default Table;
