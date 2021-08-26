import React, { useState } from "react";
import { parseCookies } from "nookies";

import Admin from "../../../layouts/Admin.js";
import Api from "../../../services/Api.js";
import CardLineChart from "../../../components/Cards/CardLineChart.js";
import CardStats from "../../../components/Cards/CardStats.js";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Link } from "../../../components/Links/Link.js";
import CardTable from "../../../components/Cards/CardTable.js";

const BankManagement = ({ userID, bank, labels, metaReal, metaMax, metaMin }) => {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: bank });
  const formContribution = useForm();
  const registerContrib = formContribution.register;
  const handleSubmitContrib = formContribution.handleSubmit;
  const errorsContrib = formContribution.formState.errors;
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const api = Api();

  async function handleInsert(data) {
    setIsSubmiting(true);

    const auxCurrency = data.currencyValue.split("/");
    data = {
      currency: auxCurrency[0],
      initialsCurrency: auxCurrency[1],
      initialValue: data.initialValue,
      period: data.period,
      userID: userID,
      currentyValue: data.initialValue
    };

    const { result, message } = await api.post("/api/banks/add", data);

    setIsSubmiting(false);

    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Inserida com sucesso");
    router.push("/admin/bank-management");
  }

  async function handleInsertContribution(data) {
    setIsSubmiting(true);
    data = {
      value: data.contribution,
      bankID: bank.bankID
    };

    const { result, message } = await api.post("/api/contributions/add", data);

    setIsSubmiting(false);

    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Aporte realizado com sucesso");
    router.push("/admin/bank-management");
  }

  function formatMoney(value, currency) {
    value = parseFloat(value).toFixed(2);

    if (currency.toUpperCase() == "R$") {
      value = value.toString().replace(".", ",")
    }

    return value;
  }

  const now = new Date();
  const start = new Date(bank.start);
  const diff = Math.abs(now.getTime() - start.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days == 0) {
    days = 1;
  } else if (bank.period < metaReal.length && days > bank.period) {
    days = bank.period - 1;
  } else if (bank.period > metaReal.length && days > metaReal.length) {
    days = metaReal.length - 1;
  }

  return (
    <>
      {
        bank.bankID &&
        <>
          <div className="flex flex-wrap">
            <CardLineChart labels={labels} metaReal={metaReal} metaMax={metaMax} metaMin={metaMin} />
          </div>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 xl:w-3/12 pr-4">
              <CardStats
                statSubtitle="META REAL DA PRÓXIMA JOGADA"
                statTitle={bank.initialsCurrency + " " + formatMoney(metaReal[days + 1], bank.initialsCurrency)}
                statIconName="fas fa-flag-checkered"
                statIconColor="bg-orange-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="META MÁXIMA DA PRÓXIMA JOGADA"
                statTitle={bank.initialsCurrency + " " + formatMoney(metaMax[days + 1], bank.initialsCurrency)}
                statIconName="fas fa-flag"
                statIconColor="bg-lightBlue-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
              <CardStats
                statSubtitle="META MÍNIMA DA PRÓXIMA JOGADA"
                statTitle={bank.initialsCurrency + " " + formatMoney(metaMin[days + 1], bank.initialsCurrency)}
                statIconName="far fa-flag"
                statIconColor="bg-yellow-500"
              />
            </div>
            <div className="w-full lg:w-6/12 xl:w-3/12 pl-4">
              <CardStats
                statSubtitle="LUCRO OBTIDO ATÉ O MOMENTO"
                statTitle={bank.initialsCurrency + " " + formatMoney((parseFloat(bank.currentyValue) - parseFloat(bank.initialValue)).toFixed(2).toString(), bank.initialsCurrency)}
                statIconName="far fa-money-bill-alt"
                statIconColor="bg-emerald-500"
              />
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-gray-800 rounded shadow-lg mt-6">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <h3 className="font-semibold text-lg text-white">Atualizar valor da banca</h3>
              </div>
              <hr className="my-4 border-b-1 border-gray-700"></hr>

              <div className="flex flex-wrap">
                <div className="bg-emerald-500 text-white mx-auto rounded-lg shadow-lg px-4 py-2">Banca: <b>{bank.initialsCurrency + " " + formatMoney(bank.currentyValue, bank.initialsCurrency)}</b></div>
              </div>
              <form onSubmit={handleSubmitContrib(handleInsertContribution)}>
                <div className="flex flex-wrap mt-6 text-center">
                  <div className="w-full mx-auto">
                    <div className="relative w-full mb-3">
                      <label
                        className={`block uppercase text-xs font-bold mb-2 ${errorsContrib.contribution ? "text-red-300" : "text-white"}`}
                        htmlFor="valor-inicial"
                      >
                        Valor de aporte
                      </label>
                      <input
                        id="contribution"
                        type="number"
                        step="0.01"
                        className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full lg:w-4/12 ease-linear transition-all duration-150 ${errorsContrib.contribution ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                        placeholder="Valor de aporte"
                        {...registerContrib('contribution', { required: "Este campo é obrigatório" })}
                      />
                      <br />
                      <button
                        type="submit"
                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 mt-3"
                      >
                        {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
                        Realizar Aporte
                      </button>
                      {errorsContrib.contribution && <p className="text-xs text-red-300 mt-1">{errorsContrib.contribution.message}</p>}
                    </div>
                  </div>
                </div>
              </form>

              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  {generalError && <div className="msg-erro mt-4">{generalError}</div>}
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col min-w-0 break-words bg-gray-800 rounded mb-18 shadow-lg mt-6">
            <div className="flex-auto p-4">
              <div className="flex flex-wrap">
                <h3 className="font-semibold text-lg text-white">Operações</h3>
              </div>
              <hr className="my-4 border-b-1 border-gray-700"></hr>

              <div className="flex flex-wrap mt-6">
                <div className="w-4/12 md:w-5/12 pr-4">
                  <div className="margin-top-link mb-3">
                    <Link href="/admin/params-bank/add" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 padding-link rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Adicionar</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap mt-3">
                <div className="w-full mb-12">
                  <CardTable
                    color="dark"
                    columns={["Data", "Jogo", "Valor apostado", "Resultado", ""]}
                    Line={[]}
                    lines={[]}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      }

      {
        !bank.bankID &&
        <div className="relative flex flex-col min-w-0 break-words bg-gray-800 rounded mb-18 shadow-lg mt-6">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <h3 className="font-semibold text-lg text-white">Crie sua banca personalizada</h3>
            </div>
            <hr className="my-4 border-b-1 border-gray-700"></hr>

            <div className="flex flex-wrap mt-6 text-center items-center">
              <div className="bg-emerald-500 text-white mx-auto rounded-lg shadow-lg px-4 py-2">Banca: <b>R$ 0,00</b></div>
            </div>
            <form onSubmit={handleSubmit(handleInsert)}>
              <div className="flex flex-wrap mt-6">
                <div className="w-full lg:w-4/12 pr-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.initialValue ? "text-red-300" : "text-white"}`}
                      htmlFor="valor-inicial"
                    >
                      Valor Inicial da Banca
                  </label>
                    <input
                      type="number"
                      step="0.01"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.initialValue ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Valor Inicial da Banca"
                      {...register('initialValue', { required: "Este campo é obrigatório" })}
                    />
                    {errors.initialValue && <p className="text-xs text-red-300 mt-1">{errors.initialValue.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-2/12 pr-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.currencyValue ? "text-red-300" : "text-white"}`}
                      htmlFor="valor-inicial"
                    >
                      Moeda
                  </label>
                    <select
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.currencyValue ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      {...register('currencyValue', { required: "Este campo é obrigatório" })}
                    >
                      <option value="">Selecione...</option>
                      <option value="Dóllar/$">Dóllar ($)</option>
                      <option value="Real/R$">Real (R$)</option>
                    </select>
                    {errors.currencyValue && <p className="text-xs text-red-300 mt-1">{errors.currencyValue.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-6/12">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.period ? "text-red-300" : "text-white"}`}
                      htmlFor="valor-inicial"
                    >
                      Defina um período em dias para suas metas
                  </label>
                    <input
                      type="text"
                      id="bank-periodo-input"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 ease-linear transition-all duration-150 ${isSubmitting ? "submitting" : ""} ${errors.period ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="7, 15, 30, 90, 120, 365, ..."
                      {...register('period', { required: "Este campo é obrigatório" })}
                    />
                    <button
                      type="submit"
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                    >
                      {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
                      Criar Banca
                    </button>
                    {errors.period && <p className="text-xs text-red-300 mt-1">{errors.period.message}</p>}
                  </div>
                </div>
              </div>
            </form>

            <div className="flex flex-wrap">
              <div className="w-full px-4">
                {generalError && <div className="msg-erro mt-4">{generalError}</div>}
              </div>
            </div>
          </div>
        </div>
      }
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

  const api = Api();
  const { bank } = await api.get(`${process.env.APIHOST}/banks?userID=${userID}`);

  const { paramsBank } = await api.get(`${process.env.APIHOST}/params-bank?period=${bank.period}`);
  let maxEndDay = paramsBank[0].endDay;

  paramsBank.map(paramBank => {
    if (maxEndDay < paramBank.endDay) maxEndDay = paramBank.endDay;
  });

  const labels = [];
  const metaReal = [];
  const metaMax = [];
  const metaMin = [];
  let valueMetaReal = parseFloat(bank.currentyValue);
  let valueMetaMax = parseFloat(bank.currentyValue);
  let valueMetaMin = parseFloat(bank.currentyValue);

  const limit = bank.period < maxEndDay ? bank.period : maxEndDay;
  for (let i = 0; i < limit; i++) {
    let paramBankSelect = null;
    const day = i + 1;

    paramsBank.map(paramBank => {
      if (paramBank.startDay <= day && paramBank.endDay >= day) paramBankSelect = paramBank;
    });

    labels[i] = day;
    metaReal[i] = valueMetaReal += valueMetaReal * paramBankSelect.real;
    metaReal[i] = metaReal[i].toFixed(2);
    metaMax[i] = valueMetaMax += valueMetaMax * paramBankSelect.maximum;
    metaMax[i] = metaMax[i].toFixed(2);
    metaMin[i] = valueMetaMin += valueMetaMin * paramBankSelect.minimium;
    metaMin[i] = metaMin[i].toFixed(2);
  }

  return { props: { userID, bank, labels, metaReal, metaMax, metaMin } };
}

export default BankManagement;

BankManagement.layout = Admin;
BankManagement.titlePage = "Gestão da Banca";