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
  console.log(bookings); 

  const sortedAndFiltered = useMemo(() => {
    const filtered =
      status === "all" ? bookings : bookings.filter((b) => b.status === status);

    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    return [...filtered].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (field.toLowerCase().includes("date")) {
        return (new Date(aVal).getTime() - new Date(bVal).getTime()) * modifier;
      }
      if (!isNaN(aVal) && !isNaN(bVal)) {
        return (Number(aVal) - Number(bVal)) * modifier;
      }
      if (typeof aVal === "string") return aVal.localeCompare(bVal) * modifier;

      return 0;
    });
  }, [bookings, status, sortBy]);

  console.log(sortedAndFiltered);

  return {
    bookings: sortedAndFiltered,
    isLoading,
    error,
  };
}
