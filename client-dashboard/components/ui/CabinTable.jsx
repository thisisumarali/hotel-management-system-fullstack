"use client";
import { getCabins, deleteCabins } from "@/utils/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ImSpinner9 } from "react-icons/im";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./table";
import Image from "next/image";
import { Button } from "./button";
import toast from "react-hot-toast";
import Link from "next/link";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";

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
  const [showForm, setShowForm] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);

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
    <>
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
                  <Link href={cabin.image} target="_blank">
                    <Image
                      src={cabin.image}
                      alt={cabin.name}
                      width={80}
                      height={80}
                    />
                  </Link>
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
                  className="mr-2"
                >
                  {deleteMutation.isLoading ? "Deleting..." : "Delete"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedCabin(cabin);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {showForm && <CreateCabinForm cabinToEdit={selectedCabin} />}
    </>
  );
};

export default CabinTable;
