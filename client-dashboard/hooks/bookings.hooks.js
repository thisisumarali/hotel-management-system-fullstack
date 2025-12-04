"use client";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "@/utils/api";
import { useMemo } from "react";

export function useBookings() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  console.log(data, "data"); 

  const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
  console.log(bookings); // This should now log the actual array

  const sortedAndFiltered = useMemo(() => {
    const filtered =
      status === "all" ? bookings : bookings.filter((b) => b.status === status);

    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (field.toLowerCase().includes("date")) {
        return (new Date(aVal) - new Date(bVal)) * modifier;
      }
      if (typeof aVal === "string") return aVal.localeCompare(bVal) * modifier;
      return (aVal - bVal) * modifier;
    });
  }, [bookings, status, sortBy]);

  console.log(sortedAndFiltered); // Sorted and filtered bookings

  return {
    bookings: sortedAndFiltered,
    isLoading,
    error,
  };
}
