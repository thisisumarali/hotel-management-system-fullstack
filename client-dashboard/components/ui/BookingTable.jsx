"use client";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  TableFooter,
} from "./table";
import { Empty } from "./Empty";
import { useBookings } from "@/hooks/bookings.hooks";
import { Loader } from "./Loader";
import { format } from "date-fns";
import Pagination from "./Pagination";

export const BookingTable = () => {
  const { bookings, totalCount, isLoading } = useBookings();

  console.log(bookings);

  if (isLoading) return <Loader />;
  if (!bookings || bookings.length === 0)
    return <Empty resourceName="Bookings" />;

  return (
    <Table className="bg-white">
      <TableHeader>
        <TableRow className="border-gray-200">
          <TableHead>Cabin</TableHead>
          <TableHead>Guest</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody className="font-medium">
        {bookings.map((bk) => (
          <TableRow key={bk._id}>
            <TableCell>{bk.cabinID.name}</TableCell>

            <TableCell>
              {bk.guestID.fullName} <br />
              <span className="text-gray-500  text-sm ">
                {bk.guestID.email}
              </span>
            </TableCell>

            <TableCell>
              {format(new Date(bk.startDate), "dd MMM yyyy")} →{" "}
              {format(new Date(bk.endDate), "dd MMM yyyy")}
              <br />
              <span className="text-gray-500 text-sm">
                {bk.numNights} nights stay
              </span>
            </TableCell>

            <TableCell
              className={
                bk.status === "unconfirmed"
                  ? "text-blue-600 font-medium"
                  : bk.status === "checked-in"
                  ? "text-green-600 font-bold"
                  : "text-gray-600 font-bold"
              }
            >
              <span
                className={
                  "text-xs uppercase rounded-2xl px-3 py-1 border " +
                  (bk.status === "unconfirmed"
                    ? "bg-blue-200"
                    : bk.status === "checked-in"
                    ? "bg-green-200"
                    : "bg-gray-200")
                }
              >
                {bk.status}
              </span>
            </TableCell>

            <TableCell className="text-green-800">${bk.totalPrice}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <Pagination colSpan={5} count={totalCount} />
      </TableFooter>
    </Table>
  );
};
