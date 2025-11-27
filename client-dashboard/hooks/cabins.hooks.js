import {
  createCabins,
  deleteCabins as deleteCabinsAPI,
  editCabin,
  getCabins,
  getSettingsApi,
} from "@/utils/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useDeleteCabins() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteCabinsAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Delete Successfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}

export function useGettingsCabins() {
  const {
    data: dataCabins,
    isLoading: isGetting,
    error: isError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return { dataCabins, isGetting, isError };
}
export function useCreateCabins() {
  const queryClient = useQueryClient();
  const { mutate: mutateCreate, isLoading: isCreating } = useMutation({
    mutationFn: createCabins,
    onSuccess: () => {
      toast.success("New cabin successfully added");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutateCreate, isCreating };
}

export function useEditCabins() {
  const queryClient = useQueryClient();

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation({
    mutationFn: ({ id, data }) => editCabin(id, data),
    onSuccess: () => {
      toast.success("Cabin updated");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { mutateEdit, isEditing };
}

