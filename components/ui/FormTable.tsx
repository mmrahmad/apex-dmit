"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { InputText } from "../form-elements";
import {
  Control,
  FieldValues,
  Path,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaCirclePlus } from "react-icons/fa6";
import {
  CustomColumnDef,
  MaterialPurchaseInterface,
  PurchaseFormValuesInterface,
} from "#/types";
import DatePicker from "../form-elements/DatePicker";

interface Props<TFieldValues extends FieldValues> {
  columns: ColumnDef<any>[];
  data: any[];
  namePrefix: string;
  control: Control<TFieldValues, any>;
  remove: UseFieldArrayRemove;
  append: UseFieldArrayAppend<PurchaseFormValuesInterface, "material_purchase">;
  setValue: any;
}

const FormTable = <TFieldValues extends FieldValues>({
  columns: defaultColumns,
  control,
  data,
  namePrefix,
  remove,
  append,
  setValue,
}: Props<TFieldValues>) => {
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
      <table className="w-full">
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
                  className="border-x border-x-white/30 px-2 py-1 text-left font-medium text-white"
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
              className="border-b border-b-zinc-300 even:bg-[#F4F7FC]"
            >
              {row.getVisibleCells().map((cell) => {
                const column = cell.column.columnDef as CustomColumnDef<any>;
                return (
                  <td
                    key={cell.id}
                    className="dark:text-bodydark p-2 text-[#637381]"
                  >
                    {column?.inputType === "text" ||
                    column?.inputType === "number" ? (
                      <InputText
                        control={control}
                        name={
                          `${namePrefix}.${rowIdx}.${column?.accessorKey}` as Path<TFieldValues>
                        }
                        type={column?.inputType}
                        isNoSpace
                        isRequired
                      />
                    ) : column?.inputType === "date" ? (
                      <DatePicker
                        control={control}
                        name={
                          `${namePrefix}.${rowIdx}.${column?.accessorKey}` as Path<TFieldValues>
                        }
                        setValue={setValue}
                      />
                    ) : null}
                  </td>
                );
              })}
              {rowIdx > 0 && (
                <td>
                  <RiDeleteBin6Line onClick={() => remove(rowIdx)} />
                </td>
              )}
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
      <FaCirclePlus
        className="h-8 w-8 text-primary"
        onClick={() => append({} as MaterialPurchaseInterface)}
      />
    </div>
  );
};

export default FormTable;
