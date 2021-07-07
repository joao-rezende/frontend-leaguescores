import React from "react";

// components
import { Link } from "../Links/Link";

export default function LineUser({ data, color }) {

  function formatDate(date) {
    date = new Date(date);

    const dateFormat = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
    const hourFormat = ("0" + date.getHours()).substr(-2) + ":" + ("0" + (date.getMinutes())).substr(-2) + ":" + ("0" + (date.getSeconds())).substr(-2);

    return dateFormat + " às " + hourFormat;
  }

  return (
    <tr key={data.userID}>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        <i className={"fas fa-circle " + ((data.status) ? "text-emerald-500" : "text-red-500") + " mr-2"}></i>{" " + ((data.status) ? "Ativo" : "Inativo")}
      </td>
      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
        <span
          className={
            "font-bold " +
            +(color === "light" ? "text-blueGray-600" : "text-white")
          }
        >
          {data.name}
        </span>
      </th>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
        {formatDate(data.creationDate)}
      </td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
        <Link href={`/admin/users/edit/${data.userID}`} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
          <i className="text-emerald-400 fas fa-edit"></i> Editar
        </Link>
        <Link href="#" className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
          <i className="text-red-500 fas fa-ban"></i> Inativar
        </Link>
        <Link href="#" className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
          <i className="text-lightBlue-500 fas fa-sign-in-alt"></i> Acessar
        </Link>
      </td>
    </tr>
  );
}