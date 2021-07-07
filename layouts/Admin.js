import React from "react";

// components

import AdminNavbar from "../components/Navbars/AdminNavbar.js";
import Sidebar from "../components/Sidebar/Sidebar.js";
import FooterSmall from "../components/Footers/FooterSmall.js";
import { AdminProvider } from "../contexts/AdminContext";

export default function Admin({ children, titlePage }) {
  return (
    <AdminProvider>
      <Sidebar />
      <div className={"conteudo-admin relative md:ml-64 bg-gray-900 min-h-screen"}>
        <AdminNavbar titlePage={titlePage} />
        {/* Header */}
        <div className="mx-auto w-full pt-1 sm:pt-20 pb-9">
          <div className="px-4 md:px-10">
            {children}
          </div>
          <FooterSmall absolute />
        </div>
      </div>
    </AdminProvider>
  );
}
