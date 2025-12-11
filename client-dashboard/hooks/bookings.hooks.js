"use client";
import { useParams, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBookings, getBookingsById } from "@/utils/api";
import { useMemo } from "react";
import { PAGE_SIZE } from "@/utils/constants";

export function useBookings() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status") || "all";
  const sortBy = searchParams.get("sortBy") || "startDate-desc";
  const page = Number(searchParams.get("page") || 1);

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  const bookings = Array.isArray(data?.bookings) ? data.bookings : [];

  const sortedAndFiltered = useMemo(() => {
    // FILTER
    const filtered =
      status === "all" ? bookings : bookings.filter((b) => b.status === status);

    // SORT
    const [field, direction] = sortBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (field.toLowerCase().includes("date")) {
        return (new Date(aVal).getTime() - new Date(bVal).getTime()) * modifier;
      }

      if (!isNaN(aVal) && !isNaN(bVal)) {
        return (Number(aVal) - Number(bVal)) * modifier;
      }

      if (typeof aVal === "string") {
        return aVal.localeCompare(bVal) * modifier;
      }

      return 0;
    });

    // PAGINATION
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;

    return {
      paginated: sorted.slice(start, end),
      total: sorted.length,
    };
  }, [bookings, status, sortBy, page]);

  return {
    bookings: sortedAndFiltered.paginated,
    totalCount: sortedAndFiltered.total,
    isLoading,
    error,
  };
}
export function useBooking() {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["bookings", id],
    queryFn: () => getBookingsById(id),
    retry: false,
  });

  return { isLoading, booking: data?.booking, error };
}
