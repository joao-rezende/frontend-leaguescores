import { Router, useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Api from '../../services/Api';
import { Link } from '../Links/Link';

export { FormUser };

function FormUser(props) {
  const user = props?.user;
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: user });
  const isAddMode = !user;
  const router = useRouter();
  const [isSubmitting, setIsSubmiting] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const api = Api();

  async function handleInsert(data) {
    setGeneralError('');
    return isAddMode
      ? await createUser(data)
      : await updateUser(user.userID, data);
  }

  async function createUser(data) {
    setIsSubmiting(true);
    const { result, message } = await api.post("/api/users/add", data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Inserido com sucesso");
    router.push("/admin/users");
  }

  async function updateUser(id, data) {
    setIsSubmiting(true);
    const { result, message } = await api.post(`/api/users/edit/${id}`, data);

    setIsSubmiting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    alert("Atualizado com sucesso");
    router.push("/admin/users");
  }

  return (
    <form onSubmit={handleSubmit(handleInsert)}>
      <div className="flex flex-wrap">
        <div className="w-full">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-24 shadow-lg rounded-lg bg-gray-800 border-0 mt-16">
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div className="w-full px-4 flex justify-center">
                <div className="relative">
                  {
                    (false) ? (
                      <img
                        alt="..."
                        src="/img/team-2-800x800.jpg"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    ) : (
                      <span id="image-default-profile" className="text-sm text-emerald-500 bg-gray-700 shadow-xl inline-flex items-center justify-center rounded-full -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                        <i className="fas fa-user rounded-full align-middle border-none shadow-lg icon-user"></i>
                      </span>
                    )
                  }
                </div>
              </div>
              <div className="flex flex-wrap mt-20">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.firstName ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Nome
                    </label>
                    <input
                      type="text"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.firstName ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Primeiro nome"
                      {...register('firstName', { required: "Este campo é obrigatório" })}
                    />
                    {errors.firstName && <p className="text-xs text-red-300 mt-1">{errors.firstName.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.lastName ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Sobrenome
                  </label>
                    <input
                      type="text"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.lastName ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Sobrenome"
                      {...register('lastName', { required: "Este campo é obrigatório" })}
                    />
                    {errors.lastName && <p className="text-xs text-red-300 mt-1">Este campo é obrigatório</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.email ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      E-mail
                    </label>
                    <input
                      type="email"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.email ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="E-mail"
                      {...register(
                        'email',
                        {
                          required: "Este campo é obrigatório",
                          pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            message: "Informe um e-mail válido"
                          }
                        }
                      )}
                    />
                    {errors.email && <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.type ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Tipo
                    </label>
                    <select
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.type ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      {...register('type', { required: "Este campo é obrigatório" })}
                    >
                      <option value="">Selecione...</option>
                      <option value="1">Administrador</option>
                      <option value="2">Usuário</option>
                    </select>
                    {errors.type && <p className="text-xs text-red-300 mt-1">{errors.type.message}</p>}
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className={`block uppercase text-xs font-bold mb-2 ${errors.password ? "text-red-300" : "text-white"}`}
                      htmlFor="grid-password"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      className={`px-3 py-3 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150 ${errors.password ? "border-red-300 border-0 border-b placeholder-red-300" : "border-0 placeholder-blueGray-500"}`}
                      placeholder="Senha"
                      {...register('password', { required: (isAddMode ? "Este campo é obrigatório" : false) })}
                    />
                    {!isAddMode && <small className="text-xs text-gray-400">Caso deixe o campo vazio, permanerá a senha já cadastrada</small>}
                    {errors.password && <p className="text-xs text-red-300 mt-1">{errors.password.message}</p>}
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
                    <Link href="/admin/users" className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm padding-link px-6 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Cancelar</Link>
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