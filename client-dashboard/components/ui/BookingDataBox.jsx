import { HomeIcon, UserIcon, WalletIcon, InfoIcon } from "lucide-react";
import React from "react";

const BookingDataBox = ({ booking }) => {
  if (!booking) return <div>No booking found</div>;

  const {
    cabinID,
    guestID,
    numNights,
    startDate,
    endDate,
    numGuests,
    totalPrice,
    cabinPrice,
    observations,
    isPaid,
  } = booking;

  const { name: cabinName } = cabinID;
  const { fullName, email, nationalID, countryFlag } = guestID;

  console.log(guestID);
  function formatDate(date) {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="border rounded-sm overflow-hidden shadow-sm">
      <div className="bg-indigo-500 text-white flex justify-between items-center px-6 py-6">
        <span className="flex items-center gap-2 text-base font-semibold">
          <HomeIcon size={18} />
          {numNights} nights in {cabinName}
        </span>

        <span className="text-sm">
          {formatDate(startDate)} — {formatDate(endDate)}
        </span>
      </div>

      {/* GUEST DETAILS */}
      <div className="px-8 py-8 space-y-3 text-base bg-white">
        <div className="flex items-center  py-2 gap-2 text-gray-700">
          {countryFlag ? (
            <span>{countryFlag}</span>
          ) : (
            <UserIcon size={16} className="text-gray-500" />
          )}

          <span className="font-medium ">{fullName}</span>

          <span>• {numGuests} guests</span>

          <span>• {email}</span>

          <span>• National ID {nationalID}</span>
        </div>

        {/* Observations */}
        <div className="flex items-center gap-2 pb-2">
          <InfoIcon size={16} className="text-gray-500" />
          <span className="text-gray-700 font-medium">Observations:&nbsp;</span>
          <span className="text-gray-600">{observations || "None"}</span>
        </div>

        <div className="bg-yellow-200/60   rounded-md px-8 py-6 mt-6 flex justify-between items-center">
          <div className="flex items-center gap-2 text-yellow-800">
            <WalletIcon size={16} />
            <span className="font-semibold">
              Total price: ${totalPrice.toLocaleString()}
            </span>

            <span className="text-sm ml-2">
              ({cabinPrice.toLocaleString()} cabin price)
            </span>
          </div>

          <span className="text-xs font-bold text-yellow-900 uppercase">
            {isPaid ? "PAID" : "WILL PAY AT PROPERTY"}
          </span>
        </div>

        {/* BOOKED DATE */}
        <p className="text-right text-sm text-gray-500 mt-2">
          Booked {formatDate(booking.createdAt)}
        </p>
      </div>
    </div>
  );
};

export default BookingDataBox;
