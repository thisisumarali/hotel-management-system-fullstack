"use client";

import React from "react";
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeFilter = searchParams.get("discount") || "all";

  function handleClick(value) {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete("discount");
    } else {
      params.set("discount", value);
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <ButtonGroup>
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        onClick={() => handleClick("all")}
      >
        All
      </Button>

      <Button
        variant={activeFilter === "no-discount" ? "default" : "outline"}
        onClick={() => handleClick("no-discount")}
      >
        No Discount
      </Button>

      <Button
        variant={activeFilter === "with-discount" ? "default" : "outline"}
        onClick={() => handleClick("with-discount")}
      >
        With Discount
      </Button>
    </ButtonGroup>
  );
};

export default Filter;
