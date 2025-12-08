import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TableCell, TableRow, TableFooter } from "./table";

const Button = ({ children, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-2 px-3 py-1 rounded-md border 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
      `}
    >
      {children}
    </button>
  );
};

const Pagination = ({ colSpan, count }) => {
  function prevPage() {}
  function nextPage() {}

  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="p-0">
        <div className="bg-white p-4 flex justify-between w-full ">
          <p className="text-gray-700">
            Showing <span className="font-semibold">1</span> to{" "}
            <span className="font-semibold">10</span> of{" "}
            <span className="font-semibold">{count}</span> results
          </p>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button onClick={prevPage}>
              <HiChevronLeft />
              Previous
            </Button>

            <Button onClick={nextPage}>
              Next
              <HiChevronRight />
            </Button>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Pagination;
