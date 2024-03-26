import React from "react";
import { UserCards } from "../../cards";
import { CurrentUsers, ActivateUsersTable } from "../../tables";
export const Users = () => {
  return (
    <>
      <h2 class="text-4xl -mt-7 font-extrabold dark:text-white">
        User Management
      </h2>

      <div className="flex-col gap-2 mt-5 md:flex-row md:flex md:justify-between">
        <CurrentUsers />
        <div className="mt-3">
          <ActivateUsersTable />
        </div>
      </div>
    </>
  );
};
