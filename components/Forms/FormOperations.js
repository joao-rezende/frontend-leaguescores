import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Api from '../../services/Api';
import { Link } from '../Links/Link';

export { FormOperations };

function FormOperations(props) {
  let operation = props?.operation;
  const bank = props?.bank;
  const isAddMode = !operation;

  if (isAddMode) {
    const now = new Date();
    operation = {
      "dateOperation": now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).substr(-2) + "-" + ("0" + now.getDate()).substr(-2)
    };
  }

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: operation });
  const router = useRouter();
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const api = Api();
  const { userID } = props.user;


  async function handleInsert(data) {
    data.userID = userID;

    setGeneralError('');
    return isAddMode
      ? await create(data)
      : await update(operation.operationID, data);
  }

  async function create(data) {
    setIsSubmiting(true);

    const { result, message } = await api.post("/api/operations/add", data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Inserido com sucesso");
    router.push("/admin/bank-management");
  }

  async function update(id, data) {
    setIsSubmiting(true);
    const { result, message } = await api.post(`/api/operations/edit/${id}`, data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Atualizado com sucesso");
    router.push("/admin/operations");
  }

  return (
    <form onSubmit={handleSubmit(handleInsert)}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-24 shadow-lg rounded-lg bg-gray-800 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-5/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.homeTeam ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Time da casa
                    </label>
                    <input
                      type="text"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.homeTeam ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Time da casa"
                      {...register('homeTeam', { required: "Este campo é obrigatório" })}
                    />
                    {errors.homeTeam && <p className="text-xs text-red-300 mt-1">{errors.homeTeam.message}</p>}
                  </div>
                </div>
                <div className="w-full hidden lg:block lg:w-2/12 px-4 text-center">
                  <label className="text-white text-9xl pt-12">X</label>
                </div>
                <div className="w-full lg:w-5/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.awayTeam ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Time fora
                  </label>
                    <input
                      type="text"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.awayTeam ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Time fora"
                      {...register('awayTeam', { required: "Este campo é obrigatório" })}
                    />
                    {errors.awayTeam && <p className="text-xs text-red-300 mt-1">Este campo é obrigatório</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.dateOperation ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Data
                    </label>
                    <input
                      type="date"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.dateOperation ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Data"
                      {...register('dateOperation', { required: "Este campo é obrigatório" })}
                    />
                    {errors.dateOperation && <p className="text-xs text-red-300 mt-1">{errors.dateOperation.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.valueOperation ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Valor da aposta
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.valueOperation ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Valor da aposta"
                      {...register(
                        'valueOperation',
                        {
                          required: "Este campo é obrigatório",
                          max: {
                            value: bank.currentyValue,
                            message: "Sua banca não tem o valor suficiente (Banca: " + bank.currentyValue + ")"
                          }
                        }
                      )}
                    />
                    {errors.valueOperation && <p className="text-xs text-red-300 mt-1">{errors.valueOperation.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.result ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Resultado da aposta
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.result ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Resultado da aposta"
                      {...register('result', { required: "Este campo é obrigatório" })}
                    />
                    {errors.result && <p className="text-xs text-red-300 mt-1">{errors.result.message}</p>}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-full px-4">
                  {generalError && <div className="msg-erro mt-4">{generalError}</div>}
                </div>
              </div>

              <div className="flex flex-wrap">
                <div className="w-6/12 px-4 pt-6">
                  <div className="margin-top-link">
                    <Link href="/admin/bank-management" className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm padding-link px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancelar</Link>
                  </div>
                </div>
                <div className="w-6/12 px-4 text-right pt-6">
                  <button type="submit"
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
                    {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
                      Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}