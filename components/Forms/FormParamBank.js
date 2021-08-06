import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Api from '../../services/Api';
import { Link } from '../Links/Link';

export { FormParamBank };

function FormParamBank(props) {
  const paramBank = props?.paramBank;
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: paramBank });
  const isAddMode = !paramBank;
  const router = useRouter();
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const api = Api();

  async function handleInsert(data) {
    setGeneralError('');
    return isAddMode
      ? await create(data)
      : await update(paramBank.paramBankID, data);
  }

  async function create(data) {
    setIsSubmiting(true);
    const { result, message } = await api.post("/api/params-bank/add", data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Inserido com sucesso");
    router.push("/admin/params-bank");
  }

  async function update(id, data) {
    setIsSubmiting(true);
    const { result, message } = await api.post(`/api/params-bank/edit/${id}`, data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Atualizado com sucesso");
    router.push("/admin/params-bank");
  }

  return (
    <form onSubmit={handleSubmit(handleInsert)}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-24 shadow-lg rounded-lg bg-gray-800 border-0">
            <div className="flex-auto px-4 lg:px-10 py-10">
              <div className="flex flex-wrap">
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.name ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.name ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Nome"
                      {...register('name', { required: "Este campo é obrigatório" })}
                    />
                    {errors.name && <p className="text-xs text-red-300 mt-1">{errors.name.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.startDay ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Dia início
                  </label>
                    <input
                      type="number"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.startDay ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Dia início"
                      {...register('startDay', { required: "Este campo é obrigatório" })}
                    />
                    {errors.startDay && <p className="text-xs text-red-300 mt-1">Este campo é obrigatório</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.endDay ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Dia fim
                    </label>
                    <input
                      type="number"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.endDay ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Dia fim"
                      {...register('endDay')}
                    />
                    {errors.endDay && <p className="text-xs text-red-300 mt-1">{errors.endDay.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.real ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Real
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.real ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Real"
                      {...register('real')}
                    />
                    {errors.real && <p className="text-xs text-red-300 mt-1">{errors.real.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.minimium ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Mínimo
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.minimium ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Mínimo"
                      {...register('minimium')}
                    />
                    {errors.minimium && <p className="text-xs text-red-300 mt-1">{errors.minimium.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.maximum ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Máximo
                    </label>
                    <input
                      type="number"
                      step="0.001"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.maximum ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Mínimmo"
                      {...register('maximum')}
                    />
                    {errors.maximum && <p className="text-xs text-red-300 mt-1">{errors.maximum.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.realCoefficient ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Conficiente real:
                    </label>
                    <input
                      type="number"
                      step="0.000001"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.realCoefficient ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Conficiente real"
                      {...register('realCoefficient')}
                    />
                    {errors.realCoefficient && <p className="text-xs text-red-300 mt-1">{errors.realCoefficient.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.minimiumCoefficient ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Coeficiente mínimo
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.minimiumCoefficient ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Coeficiente mínimo"
                      {...register('minimiumCoefficient')}
                    />
                    {errors.minimiumCoefficient && <p className="text-xs text-red-300 mt-1">{errors.minimiumCoefficient.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.maximumCoefficient ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Coeficiente máximo
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.maximumCoefficient ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Coeficiente máximo"
                      {...register('maximumCoefficient')}
                    />
                    {errors.maximumCoefficient && <p className="text-xs text-red-300 mt-1">{errors.maximumCoefficient.message}</p>}
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
                    <Link href="/admin/params-bank" className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm padding-link px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancelar</Link>
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