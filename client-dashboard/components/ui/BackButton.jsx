"use client";
import { useMoveBack } from "@/utils/constants";
import { Button } from "./button";
import Link from "next/link";

const BackButton = ({ children, className, onClick, href }) => {
  const moveBack = useMoveBack();

  return (
    <div className="flex justify-end px-4 ml-auto gap-2 items-center">
      {children && href && (
        <Link href={href}>
          <button
            onClick={onClick}
            className={` ${className} border py-4 cursor-pointer bg-indigo-500 text-white px-4 rounded-sm`}
          >
            {children}
          </button>
        </Link>
      )}
      <button
        className="border py-4 cursor-pointer bg-white px-4"
        onClick={moveBack}
      >
        ← Back
      </button>
    </div>
  );
};

export default BackButton;
