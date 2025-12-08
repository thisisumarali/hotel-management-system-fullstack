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
              value: "totalPrice-asc",
              label: "Sort By Amount (low first)",
            },
            {
              value: "totalPrice-desc",
              label: "Sort By Amount (high first)",
            },
          ]}
        />
      </span>
    </span>
  );
};

export default BookingTableOperation;
