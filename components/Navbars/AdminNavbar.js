import React, { useContext } from "react";

import UserDropdown from "../Dropdowns/UserDropdown.js";
import { AdminContext } from "../../contexts/AdminContext";

export default function Navbar({ titlePage }) {
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext);

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-2 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center py-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <button
            type="button"
            className="btn-collapse-menu mr-3 bg-gray-700 text-emerald-200 hidden md:block"
            onClick={() => collapseMenu == "" ? setCollapseMenu("collapse-menu") : setCollapseMenu("")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            {titlePage}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch"></div>
          </form>
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
