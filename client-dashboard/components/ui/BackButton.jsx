"use client";
import { useMoveBack } from "@/utils/constants";
import { Button } from "./button";
import Link from "next/link";

const BackButton = ({ children, className, onClick, disabled }) => {
  const moveBack = useMoveBack();

  return (
    <div className="flex justify-end px-4 ml-auto gap-2 items-center">
      {children && (
        <button
          disabled={disabled}
          onClick={onClick}
          className={`disabled:cursor-not-allowed ${className} border py-4 cursor-pointer bg-indigo-500 text-white px-4 rounded-sm`}
        >
          {children}
        </button>
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
