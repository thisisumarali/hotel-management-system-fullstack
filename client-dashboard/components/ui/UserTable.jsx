"use client";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
} from "./table";
import { Empty } from "./Empty";

import { Loader } from "./Loader";

import { useGuest } from "@/hooks/user.hooks";

export const UserTable = () => {
  const { guest, isLoading } = useGuest();

  console.log(guest);

  if (isLoading) return <Loader />;
  if (!guest || guest.length === 0) return <Empty resourceName="Guests" />;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow className="border-gray-200 py-10">
          <TableHead>Full Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>National ID</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className=" py-5">
        {guest.map((guest) => (
          <TableRow key={guest._id}>
            <TableCell>{guest.fullName}</TableCell>
            <TableCell>{guest.email}</TableCell>
            <TableCell>{guest.nationalID}</TableCell>
            <TableCell>{guest.nationality}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
