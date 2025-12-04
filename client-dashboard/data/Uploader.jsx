import { Button } from "@/components/ui/button";
import {
  createBookings,
  createCabins,
  createGuests,
  deleteBookings,
  deleteCabins,
  deleteGuests,
} from "@/utils/api";
import React, { useState } from "react";

const Uploader = () => {
  const [isLoading, setIsLoading] = useState(false);
  async function uploadAll() {
    setIsLoading(true);

    await deleteCabins();
    await deleteGuests();
    await deleteBookings();

    await createCabins();
    await createGuests();
    await createBookings();

    setIsLoading(false);
  }
  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }
  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>Sample Data</h3>

      <Button onClick={uploadAll}>Upload All</Button>
      <Button onClick={uploadBookings}>Uploads Booking All</Button>
    </div>
  );
};

export default Uploader;
