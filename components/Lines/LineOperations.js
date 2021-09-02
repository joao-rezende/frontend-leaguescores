import React from "react";
import { Link } from "../Links/Link";

export default function LineOperations({ data, onDelete, adicionalData }) {
    const currency = adicionalData[0];
    
    function formatDate(date) {
      date = new Date(date + " 00:00:00");
  
      const dateFormat = ("0" + date.getDate()).substr(-2) + "/" + ("0" + (date.getMonth() + 1)).substr(-2) + "/" + date.getFullYear();
  
      return dateFormat;
    }

    function formatMoney(value) {
      value = parseFloat(value).toFixed(2);
  
      if (currency.toUpperCase() == "R$") {
        value = value.toString().replace(".", ",")
      }
  
      return value;
    }

    return (
        <tr key={data.operationID}>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{formatDate(data.dateOperation)}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.homeTeam} x {data.awayTeam}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{currency + " " + formatMoney(data.valueOperation)}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{currency + " " + formatMoney(data.result)}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <Link href={`/admin/operations/edit/${data.operationID}`} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
                    <i className="text-emerald-400 fas fa-edit"></i> Editar
                </Link>
                <a href="#" onClick={onDelete} data-id={data.operationID} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
                    <i className="text-red-500 fas fa-trash"></i> Excluir
                </a>
            </td>
        </tr>
    );
}