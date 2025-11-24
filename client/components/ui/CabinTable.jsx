"use client";
import { getCabins, deleteCabins } from "@/utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./table";
import Image from "next/image";
import { Button } from "./button";
import toast from "react-hot-toast";

const CabinTable = () => {
  const queryClient = useQueryClient();

  // Fetch cabins
  const {
    data: dataCabins,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  const cabins = dataCabins?.cabins || [];

  // Mutation for deleting a cabin
  const deleteMutation = useMutation({
    mutationFn: deleteCabins,
    onSuccess: () => {
      // Refetch cabins after successful deletion
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Delete Successfully");
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <ImSpinner9 className="text-4xl animate-spin" />
      </div>
    );

  if (error) return <div>Error loading cabins</div>;

  return (
    <div>
      <Table className="bg-white">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Cabin</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <tbody>
          {cabins.map((cabin) => (
            <TableRow key={cabin._id}>
              <TableCell>
                {cabin.image && (
                  <Image
                    src={cabin.image}
                    alt={cabin.name}
                    width={50}
                    height={50}
                  />
                )}
              </TableCell>
              <TableCell>{cabin.name}</TableCell>
              <TableCell>Fit's upto {cabin.maxCapacity} guests</TableCell>
              <TableCell>{cabin.regularPrice}$</TableCell>
              <TableCell className="text-green-600 font-bold">
                {cabin.discount}$
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(cabin._id)}
                  disabled={deleteMutation.isLoading}
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CabinTable;
