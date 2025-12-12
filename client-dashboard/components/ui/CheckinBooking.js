"use client";
import { useEffect, useState } from "react";
import BackButton from "./BackButton";
import BookingDataBox from "./BookingDataBox";
import { useBooking } from "@/hooks/bookings.hooks";
import { useMoveBack } from "@/utils/constants";
import { Loader } from "./Loader";
import CheckBox from "./CheckBox";

const CheckinBooking = () => {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isLoading } = useBooking();
  const moveBack = useMoveBack();

  useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

  if (isLoading) return <Loader />;
  if (!booking) return <div>No booking found</div>;

  const { status, guestID, totalPrice } = booking;

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
      <CheckBox
        checked={confirmPaid}
        disabled={confirmPaid}
        onChange={() => setConfirmPaid((confirm) => !confirm)}
        id="confirm"
      >
        I confirm that {guestID.fullName} has paid the total amount of Rs{" "}
        {totalPrice?.toLocaleString()}
      </CheckBox>

      <BackButton disabled={!confirmPaid}>
        Check In Booking{" "}
        <span className="font-medium uppercase">
          {guestID.fullName.split(" ")[0]}
        </span>
      </BackButton>
    </div>
  );
};

export default CheckinBooking;
