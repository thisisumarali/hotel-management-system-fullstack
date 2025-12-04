"use client";
import { getBookings, getGuests } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useGuest() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
  });

  return { guest: data?.guests, isLoading, error };
}
