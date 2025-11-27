"use client";
import { useSettingsCabins, useUpdateSettings } from "@/hooks/settings.hooks";
import { ImSpinner9 } from "react-icons/im";

const page = () => {
  const { isLoading, setting } = useSettingsCabins();
  const { isUpdating, updateSetting } = useUpdateSettings();

  const { maxBookingLength, maxGuestPerBooking, minBookingLength } =
    setting || {};

  if (isLoading)
    return (
      <div className="flex justify-start items-center h-64 pl-10">
        <ImSpinner9 className="text-4xl animate-spin" />
      </div>
    );
  function handleUpdate(e, field) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({
      ...setting,
      [field]: Number(value),
    });
  }

  return (
    <div className="p-10">
      <h1 className="md:text-3xl text-2xl font-bold pb-4">
        Update Hotel Settings
      </h1>
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white p-8 rounded-xl shadow-md">
        <form className="space-y-6">
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="min-nights"
            >
              Minimum nights/booking
            </label>
            <input
              type="number"
              id="min-nights"
              defaultValue={minBookingLength}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="max-nights"
            >
              Maximum nights/booking
            </label>
            <input
              type="number"
              id="max-nights"
              defaultValue={maxBookingLength}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "maxBookingLength")}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 items-start gap-4">
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="max-guests"
            >
              Maximum guests/booking
            </label>
            <input
              type="number"
              id="max-guests"
              defaultValue={maxGuestPerBooking}
              disabled={isUpdating}
              onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
              className="rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
