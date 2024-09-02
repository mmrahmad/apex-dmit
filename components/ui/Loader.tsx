import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-full min-h-[80vh] w-full items-center justify-center">
      <HashLoader color="#2563EB" size={40} />
    </div>
  );
};

export default Loader;
