import React, { createContext, useEffect, useReducer } from "react";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FooterSmall from "components/Footers/FooterSmall.js";
import IdleTimer from "helpers/IdleTimer";
import { useRouter } from "next/router";

export const AdminContext = createContext();

function Admin({ children, titlePage }) {
  const router = useRouter();
  const [collapseMenu, setCollapseMenu] = useReducer((state, action) => { return action; }, '');

  return (
    <AdminContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      <div className={collapseMenu}>
        <Sidebar />
        <div className={"conteudo-admin relative md:ml-64 bg-gray-900 min-h-screen"}>
          <AdminNavbar titlePage={titlePage} />
          {/* Header */}
          <div className="mx-auto w-full pt-20 pb-9">
            <div className="px-4 md:px-10">
              <h3>Teste - {'rtes'}</h3>
              {children}
            </div>
            <FooterSmall absolute />
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  );
}

export default Admin;