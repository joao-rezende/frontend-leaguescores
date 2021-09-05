import { parseCookies } from "nookies";
import React from "react";
import CardStats from "../../components/Cards/CardStats.js";
import CardAreaChartBankEvolution from "../../components/Cards/CardAreaChartBankEvolution.js";

import Admin from "../../layouts/Admin.js";
import Api from "../../services/Api.js";
import CardBarChart from "../../components/Cards/CardBarChart.js";
import CardLineChartAccResult from "../../components/Cards/CardLineChartAccResult.js";

export default function Home({ resultBank }) {
  function formatMoney(value, currency) {
    value = parseFloat(value).toFixed(2);

    if (currency.toUpperCase() == "R$") {
      value = value.toString().replace(".", ",")
    }

    return value;
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pr-4">
          <CardStats
            statSubtitle="RESULTADO NO PERÍODO"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.periodResult ? formatMoney(resultBank.periodResult, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-coins"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 xl:pr-4 lg:pl-4">
          <CardStats
            statSubtitle="LUCRO MÉDIO POR APOSTA"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.avgProfit ? formatMoney(resultBank.avgProfit, resultBank.initialsCurrency) : "0,00")}
            statIconName="far fa-money-bill-alt"
            statIconColor="bg-emerald-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pr-4 xl:pl-4">
          <CardStats
            statSubtitle="ROI"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.roi ? formatMoney(resultBank.roi, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-balance-scale"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pl-4">
          <CardStats
            statSubtitle="TOTAL DA BANCA"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.totalBank ? formatMoney(resultBank.totalBank, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-wallet"
            statIconColor="bg-lightBlue-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap pt-4">
        <div className="w-full xl:w-6/12 xl:pr-4">
          <CardAreaChartBankEvolution evolution={resultBank.evolution} initialsCurrency={resultBank.initialsCurrency} />
        </div>
        <div className="w-full xl:w-6/12 xl:pl-4">
          <CardBarChart profits={resultBank.profits} losses={resultBank.losses} initialsCurrency={resultBank.initialsCurrency} />
        </div>
      </div>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pr-4">
          <CardStats
            statSubtitle="APOSTAS REALIZADAS"
            statTitle={(resultBank && resultBank.totalBets ? resultBank.totalBets : "0")}
            statIconName="fas fa-hand-holding-usd"
            statIconColor="bg-lightBlue-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 xl:pr-4 lg:pl-4">
          <CardStats
            statSubtitle="TOTAL INVESTIDO"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.totalInvested ? formatMoney(resultBank.totalInvested, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-donate"
            statIconColor="bg-orange-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pr-4 xl:pl-4">
          <CardStats
            statSubtitle="RESULTADO DA BANCA"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.resultbank ? formatMoney(resultBank.resultbank, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-coins"
            statIconColor="bg-red-500"
          />
        </div>
        <div className="w-full lg:w-6/12 xl:w-3/12 px-0 lg:pl-4">
          <CardStats
            statSubtitle="STAKE MÉDIA"
            statTitle={resultBank.initialsCurrency + " " + (resultBank && resultBank.avgstake ? formatMoney(resultBank.avgstake, resultBank.initialsCurrency) : "0,00")}
            statIconName="fas fa-percent"
            statIconColor="bg-emerald-500"
          />
        </div>
      </div>
      <div className="flex flex-wrap pt-4 mb-12">
        <div className="w-full">
          <CardLineChartAccResult results={resultBank.resultsAcc} initialsCurrency={resultBank.initialsCurrency} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const api = Api();
  const host = (ctx.req.headers.referer && ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);

  if (!userID) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const resultBank = await api.post(host + '/api/banks/result', { userID });

  return { props: { resultBank } };
}

Home.layout = Admin;
Home.titlePage = "Resultados da Banca";