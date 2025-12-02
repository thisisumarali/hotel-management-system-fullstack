import React from "react";
import Filter from "./Filter";
import { SortBy } from "./SortBy";

const CabinTableOperation = () => {
  return (
    <span className="flex justify-center items-center ">
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "discount", label: "Discount" },
        ]}
      />
      <span className="ml-3 ">
        <SortBy
          options={[
            { value: "name-asc", label: "Sort by name (A-Z)" },
            { value: "name-desc", label: "Sort by name (Z-A)" },
            {
              value: "regularPrice-asc",
              label: "Sort By Low Price First (low first)",
            },
            {
              value: "regularPrice-desc",
              label: "Sort By High Price First (low first)",
            },
            {
              value: "maxCapacity-asc",
              label: "Sort By Capacity (low first)",
            },
            {
              value: "maxCapacity-desc",
              label: "Sort By Capacity (high first)",
            },
          ]}
        />
      </span>
    </span>
  );
};

export default CabinTableOperation;
