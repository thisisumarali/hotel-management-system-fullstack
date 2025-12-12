"use client";
import { useRouter } from "next/navigation";

export const PAGE_SIZE = 10;
export function useMoveBack() {
  const router = useRouter();

  function moveBack() {
    router.back();
  }

  return moveBack;
}
