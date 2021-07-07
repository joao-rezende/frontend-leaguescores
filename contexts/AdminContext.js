import { createContext, useState } from "react";

export const AdminContext = createContext({});

export function AdminProvider({ children }) {
  const [collapseMenu, setCollapseMenu] = useState('');

  return (
    <AdminContext.Provider value={{ collapseMenu, setCollapseMenu }}>
      <div className={collapseMenu}>
        {children}
      </div>
    </AdminContext.Provider>
  )
}