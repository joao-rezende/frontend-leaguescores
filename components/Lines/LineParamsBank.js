import React from "react";
import { Link } from "../Links/Link";

export default function LineParamsBank({ data, color, onDelete }) {
    return (
        <tr key={data.paramBankID}>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{data.name}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.startDay}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.endDay}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.real}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.minimium}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.maximum}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.realCoefficient}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.minimiumCoefficient}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">{data.maximumCoefficient}</td>
            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                <Link href={`/admin/params-bank/edit/${data.paramBankID}`} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
                    <i className="text-emerald-400 fas fa-edit"></i> Editar
                </Link>
                <a href="#" onClick={onDelete} data-id={data.paramBankID} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"}>
                    <i className="text-red-500 fas fa-trash"></i> Excluir
                </a>
            </td>
        </tr>
    );
}