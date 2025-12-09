"use client";

import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { TableCell, TableRow } from "./table";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PAGE_SIZE } from "@/utils/constants";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page") || 1);
  const pageCount = Math.ceil(count / PAGE_SIZE);

  function updatePage(value) {
    const params = new URLSearchParams(searchParams);
    params.set("page", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  function prevPage() {
    updatePage(currentPage === 1 ? 1 : currentPage - 1);
  }

  function nextPage() {
    updatePage(currentPage === pageCount ? pageCount : currentPage + 1);
  }

  if (pageCount <= 1) return null;
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="p-0">
        <div className="bg-white p-4 flex justify-between w-full ">
          <p className="text-gray-700">
            Showing
            <span className="font-semibold">
              {" "}
              {(currentPage - 1) * PAGE_SIZE + 1}{" "}
            </span>
            to
            <span className="font-semibold">
              {" "}
              {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
            </span>{" "}
            of <span className="font-semibold">{count}</span> results
          </p>

          <div className="flex gap-4">
            <Button onClick={prevPage} disabled={currentPage === 1}>
              <HiChevronLeft />
              Previous
            </Button>

            <Button onClick={nextPage} disabled={currentPage === pageCount}>
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
