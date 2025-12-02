"use client";

import React from "react";
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { useSearchParams, useRouter } from "next/navigation";

const Filter = ({ filterField, options }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeFilter = searchParams.get(filterField) || "all";

  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(filterField);
    } else {
      params.set(filterField, value);
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <ButtonGroup>
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={activeFilter === opt.value ? "default" : "outline"}
          onClick={() => handleClick(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default Filter;
