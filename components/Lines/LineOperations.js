import React from "react";
import { Link } from "../Links/Link";

export default function LineParamsBank({ data, onDelete }) {
    return (
        <tr key={data.operationID}>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data.dateOperation}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.homeTeam} x {data.awayTeam}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.valueOperation}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.result}</td>
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