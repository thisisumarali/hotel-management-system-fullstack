import React from "react";
import Filter from "./Filter";
import { SortBy } from "./SortBy";

const BookingTableOperation = () => {
  return (
    <span className="flex justify-center items-center ">
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Checked Out" },
          { value: "checked-in", label: "Checked In" },
          { value: "unconfirmed", label: "Unconfirmed" },
        ]}
      />
      <span className="ml-3 ">
        <SortBy
          options={[
            {
              value: "startDate-desc",
              label: "Sort by date (recent first)",
            },
            {
              value: "startDate-asc",
              label: "Sort by date (earlier first)",
            },

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

export default BookingTableOperation;
