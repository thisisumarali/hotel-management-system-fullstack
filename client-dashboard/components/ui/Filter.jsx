"use client";

import React from "react";
import { ButtonGroup } from "./button-group";
import { Button } from "./button";
import { useSearchParams, useRouter } from "next/navigation";

const Filter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

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
      <Button variant="outline" onClick={() => handleClick("all")}>
        All
      </Button>
      <Button variant="outline" onClick={() => handleClick("no-discount")}>
        No Discount
      </Button>
      <Button variant="outline" onClick={() => handleClick("with-discount")}>
        With Discount
      </Button>
    </ButtonGroup>
  );
};

export default Filter;
