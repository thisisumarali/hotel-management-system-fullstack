"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { useRouter, useSearchParams } from "next/navigation";

export const SortBy = ({ options }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const sortField = "sortBy";
  const activeSort = searchParams.get(sortField) || options[0]?.value;

  function handleChange(value) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === options[0]?.value) {
      params.delete(sortField);
    } else {
      params.set(sortField, value);
    }

    router.push(`?${params.toString()}`);
  }

  return (
    <Select defaultValue={activeSort} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px] lg:w-[250px] 2xl:w-[300px]">
        <SelectValue placeholder={options[0]?.label} />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.value === activeSort}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
