import BackButton from "@/components/ui/BackButton";
import { BookingTable } from "@/components/ui/BookingTable";
import BookingTableOperation from "@/components/ui/BookingTableOperation";
import React from "react";

const page = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Bookings</h1>
        <div>
          <BookingTableOperation />
        </div>
      </div>
      <div className="py-4">
        <BookingTable />
      </div>
      <BackButton />
    </div>
  );
};

export default page;
