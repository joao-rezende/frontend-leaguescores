import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import Admin from "../../../layouts/Admin.js";
import Api from "../../../services/Api.js";
import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardStats from "../../../components/Cards/CardStats.js";

const BankManagement = () => {
  const api = Api();

  return (
    <>
      <div className="flex flex-wrap">
        <CardLineChart />
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 pr-4">
          <CardStats
            statSubtitle="META REAL DA PRÓXIMA JOGADA"
            statTitle="$ 5,49"
            statIconName="fas fa-flag-checkered"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="META MÁXIMA DA PRÓXIMA JOGADA"
            statTitle="$ 4,37"
            statIconName="fas fa-flag"
            statIconColor="bg-lightBlue-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardStats
            statSubtitle="META MÍNIMA DA PRÓXIMA JOGADA"
            statTitle="$ 3,78"
            statIconName="far fa-flag"
            statIconColor="bg-yellow-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 pl-4">
          <CardStats
            statSubtitle="LUCRO OBTIDO ATÉ O MOMENTO"
            statTitle="$ 20,00"
            statIconName="far fa-money-bill-alt"
            statIconColor="bg-emerald-500"
          />
        </div>
      </div>

      <div className="relative flex flex-col min-w-0 break-words bg-gray-800 rounded mb-18 shadow-lg mt-6">
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <h3 class="font-semibold text-lg text-white">Crie sua banca personalizada</h3>
          </div>
          <hr class="my-4 border-b-1 border-gray-700"></hr>

          <div className="flex flex-wrap mt-6 text-center items-center">
              <div className="bg-emerald-500 text-white mx-auto rounded-lg shadow-lg px-4 py-2">Banca: <b>R$ 0,00</b></div>
          </div>
          <div className="flex flex-wrap mt-6">
            <div className="w-full lg:w-4/12 pr-4">
              <div className="relative w-full mb-3">
                <label
                  className={`block uppercase text-xs font-bold mb-2 text-white`}
                  htmlFor="valor-inicial"
                >
                  Valor Inicial da Banca
                </label>
                <input
                  type="text"
                  className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 border-0 placeholder-blueGray-500`}
                  placeholder="Valor Inicial da Banca"
                />
              </div>
            </div>
            <div className="w-full lg:w-2/12 pr-4">
              <div className="relative w-full mb-3">
                <label
                  className={`block uppercase text-xs font-bold mb-2 text-white`}
                  htmlFor="valor-inicial"
                >
                  Moeda
                </label>
                <select
                  className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 border-0 placeholder-blueGray-500`}
                >
                  <option value="">Selecione...</option>
                  <option value="1">Dollar ($)</option>
                  <option value="2">Real (R$)</option>
                </select>
              </div>
            </div>
            <div className="w-full lg:w-6/12">
              <div className="relative w-full mb-3">
                <label
                  className={`block uppercase text-xs font-bold mb-2 text-white`}
                  htmlFor="valor-inicial"
                >
                  Defina um período em dias para suas metas
                </label>
                <input
                  type="text"
                  id="bank-periodo-input"
                  className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 ease-linear transition-all duration-150 border-0 placeholder-blueGray-500`}
                  placeholder="7, 15, 30, 90, 120, 365, ..."
                />
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Criar Banca
                </button>
              </div>
            </div>
          </div>
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

export default BankManagement;

BankManagement.layout = Admin;
BankManagement.titlePage = "Gestão da Banca";