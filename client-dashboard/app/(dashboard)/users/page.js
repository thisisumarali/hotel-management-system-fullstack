import { UserTable } from "@/components/ui/UserTable";
import React from "react";

const page = () => {
  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold ">Users</h1>
        <p>test</p>
      </div>
      <div className="py-4">
        <UserTable />
      </div>
    </div>
  );
};

export default page;
