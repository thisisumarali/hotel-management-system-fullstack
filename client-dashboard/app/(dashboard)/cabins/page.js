"use client";

import AddCabin from "@/components/ui/AddCabin";
import CabinTable from "@/components/ui/CabinTable";

const page = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">All Cabins</h1>
        <p>Filter / Sort</p>
      </div>
      <div>
        <div className="p-4">
          <CabinTable />
        </div>
        <AddCabin />
      </div>
    </div>
  );
};

export default page;
