"use client";
import { ImSpinner9 } from "react-icons/im";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "./table";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { useDeleteCabins, useGettingsCabins } from "@/hooks/cabins.hooks";
import { HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";

const CabinTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCabin, setSelectedCabin] = useState(null);
  const { isDeleting, deleteCabin } = useDeleteCabins();
  const { isGetting, isError, dataCabins } = useGettingsCabins();

  const cabins = dataCabins?.cabins || [];

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
                {cabin.discount ? (
                  cabin.discount + "$"
                ) : (
                  <span className="text-black">&mdash;</span>
                )}
              </TableCell>
              <TableCell>
                <button className="">
                  <HiSquare2Stack />
                </button>
                <button
                  variant="destructive"
                  onClick={() => deleteCabin(cabin._id)}
                  disabled={isDeleting}
                  className="text-red-800"
                >
                  <HiTrash />
                </button>
                <button
                  className=""
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
      {showForm && <CreateCabinForm cabinToEdit={selectedCabin} />}
    </>
  );
};

export default CabinTable;
