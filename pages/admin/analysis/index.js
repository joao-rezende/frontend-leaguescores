import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

// components
import LineAnalysis from "../../../components/Lines/LineAnalysis";

// layout for page
import Admin from "../../../layouts/Admin";
import CardTable from "../../../components/Cards/CardTable";
import Api from "../../../services/Api";
import { Link } from "../../../components/Links/Link";

export default function Analysis() {
  const api = Api();
  const [analysis, setAnalysis] = useState([]);

  async function listAnalysis(page = 1) {
    const offset = (page - 1) * 25;
    const { analysis, total } = await api.post("/api/analysis", { offset });
    setAnalysis(analysis);
  }

  useEffect(() => {
    listAnalysis();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-5/12 pr-4">
          <div className="margin-top-link">
            <Link href="/admin/users/add" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 padding-link rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Adicionar</Link>
          </div>
        </div>
        <div className="w-full sm:w-7/12 pt-4 sm:pt-0 sm:pl-4 text-right">
          <span className="z-2 leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded-full text-base items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 relative rounded-full text-sm shadow outline-none focus:outline-none focus:ring-gray-500 w-full xl:w-5/12 pl-10"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12">
          <CardTable
            color="dark"
            columns={
              [
                "Data do jogo",
                {
                  class: "text-right",
                  value: "Time da casa"
                },
                "",
                "Time visitante",
                ""
              ]
            }
            Line={LineAnalysis}
            lines={analysis}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ['leaguescores.token']: userID } = parseCookies(ctx);

  if (!userID) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: {} };
}

Analysis.layout = Admin;
Analysis.titlePage = "Análises";