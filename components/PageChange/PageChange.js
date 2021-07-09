import React from "react";

// reactstrap components
// import { Spinner } from "reactstrap";

// core components
import Admin from "../../layouts/Admin";

export default function PageChange(props) {
  return (
    <div>
      <div className="top-0 left-0 w-full h-full block z-50 fixed bg-black bg-opacity-50"></div>
      <div className="my-32 w-full text-center fixed z-50 top-0">
        <div className="mx-auto">
          <div className="block mb-4">
            <i className="fas fa-circle-notch animate-spin text-white mx-auto text-6xl"></i>
          </div>
          <h4 className="text-lg font-medium text-white">
            Carregando
          </h4>
        </div>
      </div>
    </div>
  );
}


PageChange.layout = Admin;