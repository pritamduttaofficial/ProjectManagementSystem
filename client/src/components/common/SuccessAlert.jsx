import React, { useEffect } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export function SuccessAlert({ info, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed z-50 right-10 rounded-md border-l-4 border-green-500 bg-green-100 p-4">
      <div className="flex items-center justify-between space-x-4">
        <div>
          <FiCheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-green-600">{info}</p>
        </div>
        <div>
          <IoClose
            className="h-6 w-6 cursor-pointer text-green-600"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
}
