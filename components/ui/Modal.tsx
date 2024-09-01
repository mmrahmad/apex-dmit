"use client";

import React, { useRef } from "react";
import Button from "./Button";
import { useOnClickOutside } from "usehooks-ts";

{
  /* <button data-modal-target="default-modal" data-modal-toggle="default-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
  Toggle modal
</button> */
}

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onSave: () => void;
}

const Modal: React.FC<Props> = ({ open, title, children, onClose, onSave }) => {
  const modalBodyRef = useRef(null);
  useOnClickOutside(modalBodyRef, onClose);
  return (
    <div
      id="default-modal"
      aria-hidden={open}
      className={`fixed left-0 right-0 top-0 z-50 flex h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black/60 md:inset-0 ${!open ? "hidden" : ""}`}
    >
      <div
        ref={modalBodyRef}
        className="relative mx-auto max-h-full w-full max-w-[916px] p-4"
      >
        <div className="relative rounded-lg bg-white shadow">
          <div className="rounded-t-lg border-b bg-primary px-4 py-2 text-white dark:border-gray-600">
            <h3 className="text-center text-xl font-semibold">{title}</h3>
          </div>
          <div className="space-y-4 p-4 md:p-5">{children}</div>

          <div className="flex items-center justify-end rounded-b-lg border-b-[15px] border-primary p-4 md:p-5">
            <Button>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
