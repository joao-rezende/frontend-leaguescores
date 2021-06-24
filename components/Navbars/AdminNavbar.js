import React, { useContext } from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";
import { AdminContext } from '../../layouts/Admin';

export default function Navbar({ titlePage }) {
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center py-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <button
            type="button"
            className="btn-collapse-menu mr-3 bg-gray-700 text-emerald-500"
            onClick={() => collapseMenu == "" ? setCollapseMenu("collapse-menu") : setCollapseMenu("")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            {titlePage}
          </a>
          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search here..."
                className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 relative rounded text-sm shadow outline-none focus:outline-none focus:ring-gray-500 w-full pl-10"
              />
            </div>
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
