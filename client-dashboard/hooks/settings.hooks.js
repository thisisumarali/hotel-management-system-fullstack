"use client";
import { getSettingsApi, updateSettingsApi } from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useSettingsCabins() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettingsApi,
  });

  return { setting: data?.settings, isLoading, error };
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      toast.success("Settings updated");
      queryClient.invalidateQueries({ queryKey: ["setting"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateSetting, isUpdating };
}
