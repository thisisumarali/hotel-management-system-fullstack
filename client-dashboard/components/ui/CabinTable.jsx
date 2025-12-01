"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./table";
import Image from "next/image";
import Link from "next/link";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "./Modal";
import { Button } from "./button";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import {
  useCreateCabins,
  useDeleteCabins,
  useGettingsCabins,
} from "@/hooks/cabins.hooks";

const CabinTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const [cabinToDelete, setCabinToDelete] = useState(null);

  const { isGetting, isError, dataCabins } = useGettingsCabins();
  const { mutateCreate, isCreating } = useCreateCabins();
  const { isDeleting, deleteCabin } = useDeleteCabins();

  const searchParams = useSearchParams(); // fixed
  const filterValue = searchParams?.get("discount") || "all";

  const cabins = dataCabins?.cabins || [];

  // Filtering logic using your discount logic
  let filteredCabins = cabins;
  if (filterValue === "no-discount")
    filteredCabins = cabins.filter((c) => c.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = cabins.filter((c) => c.discount > 0);

  const handleDuplicate = (cabin) => {
    mutateCreate({
      name: `Copy of ${cabin.name}`,
      maxCapacity: cabin.maxCapacity,
      regularPrice: cabin.regularPrice,
      discount: cabin.discount,
      image: cabin.image,
      description: cabin.description,
    });
  };

  if (isGetting)
    return (
      <div className="flex justify-center items-center h-64">
        <ImSpinner9 className="text-4xl animate-spin" />
      </div>
    );

  if (isError) return <div>Error loading cabins</div>;

  return (
    <>
      <Table className="bg-white">
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead></TableHead>
            <TableHead>Cabin</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <tbody>
          {filteredCabins.map((cabin) => (
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
              <TableCell className="truncate max-w-[150px]" title={cabin.name}>
                {cabin.name}
              </TableCell>
              <TableCell>Fit's upto {cabin.maxCapacity} guests</TableCell>
              <TableCell>{cabin.regularPrice}$</TableCell>
              <TableCell className="text-green-600 font-bold">
                {cabin.discount ? `${cabin.discount}$` : <span>&mdash;</span>}
              </TableCell>
              <TableCell className="flex gap-2">
                <button
                  className="text-lg"
                  disabled={isCreating}
                  onClick={() => handleDuplicate(cabin)}
                >
                  <HiSquare2Stack />
                </button>
                <button
                  className="text-red-800 text-lg"
                  disabled={isDeleting}
                  onClick={() => setCabinToDelete(cabin)}
                >
                  <HiTrash />
                </button>
                <button
                  className="text-lg"
                  onClick={() => {
                    setSelectedCabin(cabin);
                    setShowForm(true);
                  }}
                >
                  <HiPencil />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm
            cabinToEdit={selectedCabin}
            closeEditform={() => setShowForm(false)}
          />
        </Modal>
      )}

      {cabinToDelete && (
        <Modal onClose={() => setCabinToDelete(null)}>
          <div className="space-y-3 py-8 px-8">
            <h1 className="text-xl text-gray-700 font-bold">
              Delete Permanently?
            </h1>
            <p
              className="text-gray-500 py-2 truncate text-base font-normal"
              title={cabinToDelete.name}
            >
              Are you sure you want to delete {cabinToDelete.name}? This action
              will delete {cabinToDelete.name} permanently.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button variant="outline" onClick={() => setCabinToDelete(null)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  deleteCabin(cabinToDelete._id);
                  setCabinToDelete(null);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default CabinTable;
