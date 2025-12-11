"use client";
import { useBooking } from "@/hooks/bookings.hooks";
import React from "react";
import { Loader } from "./Loader";
import { useMoveBack } from "@/utils/constants";
import BookingDataBox from "./BookingDataBox";

const BookingDetails = () => {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Loader />;
  if (!booking) return <div>No booking found</div>;

  const { status, cabinID, guestID, numNights, cabinPrice } = booking;

  const statusToClasses = {
    unconfirmed: "bg-blue-200 text-blue-600",
    "checked-in": "bg-green-200 text-green-600",
    "checked-out": "bg-gray-300 text-gray-700",
  };

  const badgeClass = statusToClasses[status];
  const formattedStatus = status.replace("-", " ");

  return (
    <div className="p-10">
      <div className="flex items-center gap-4 pb-4">
        <h1 className="text-2xl font-bold">{guestID.fullName} - BOOKING</h1>

        <span
          className={`text-xs uppercase rounded-2xl px-3 py-1 flex items-center border font-medium ${badgeClass}`}
        >
          {formattedStatus}
        </span>

        <button
          className="ml-auto text-black cursor-pointer"
          onClick={moveBack}
        >
          ← Back
        </button>
      </div>
      <div className="mt-6">
        <BookingDataBox booking={booking} />
      </div>
      <div className="flex justify-between m-6">
        <button
          className="ml-auto border py-4 cursor-pointer bg-white px-4"
          onClick={moveBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default BookingDetails;
