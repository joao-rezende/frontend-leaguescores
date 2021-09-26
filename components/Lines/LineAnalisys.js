import React from "react";
import { Link } from "../Links/Link";

export default function LineAnalysis({ data, adicionalData }) {
  function zeroFill(value) {
    return ("0" + value).substr(-2);
  }

  function formatDate(date) {
    date = new Date(date);

    let dateFormat = zeroFill(date.getDate()) + "/" + zeroFill(date.getMonth() + 1) + "/" + date.getFullYear();
    dateFormat += " às " + zeroFill(date.getHours()) + ":" + zeroFill(date.getMinutes()) + ":" + zeroFill(date.getSeconds());

    return dateFormat;
  }

  return (
    <tr key={data.analysisID}>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">{formatDate(data.gameDate)}</td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-right text-xs whitespace-nowrap p-4">{data.homeTeamName} <img className="pl-4" src={data.homeTeamImage} style={{ height: 45, display: "inline" }} /></td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-center text-xl whitespace-nowrap p-4"><span className="fas fa-times"></span></td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"><img className="pr-4" src={data.awayTeamImage} style={{ height: 45, display: "inline" }} /> {data.awayTeamName}</td>
      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
        <Link href={`/analysis/consult/${data.analysisID}`} className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 text-emerald-400"}>
          Ver análise
        </Link>
        <a href="#" className={"background-transparent font-bold uppercase px-1 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:text-white text-gray-300"}>
          Análise externa
        </a>
      </td>
    </tr>
  );
}