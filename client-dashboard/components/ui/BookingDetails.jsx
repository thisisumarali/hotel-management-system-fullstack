"use client";
import { useBooking } from "@/hooks/bookings.hooks";
import React from "react";
import { Loader } from "./Loader";
import { useMoveBack } from "@/utils/constants";
import BookingDataBox from "./BookingDataBox";
import BackButton from "./BackButton";
import Link from "next/link";

const BookingDetails = () => {
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  if (isLoading) return <Loader />;
  if (!booking) return <div>No booking found</div>;

  const { status, guestID, _id, isPaid } = booking;

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

      <BookingDataBox booking={booking} />
      {status === "unconfirmed" && (
        <Link href={`/checkin/${_id}`}>
          <BackButton>Check In</BackButton>
        </Link>
      )}
    </div>
  );
};

export default BookingDetails;
