import React from "react";
import { UserDropdown } from "./UserDropdown";

export default function AdminNavbar() {
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4">
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown onLogout={() => {}} />
          </ul>
        </div>
      </nav>
    </>
  );
}
