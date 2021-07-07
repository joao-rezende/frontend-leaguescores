import React, { useContext } from "react";
import { useForm } from 'react-hook-form';

// layout for page

import Auth from "../layouts/Auth";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const { error, signIn } = useContext(AuthContext);

  async function handleSingIn(data) {
    await signIn(data);
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-800 border-0">
              <div className="rounded-t mb-0 px-6 py-6 text-center">
                <div className="bg-white box-circle inline-block p-4">
                  <img alt="Logo Empresa" className="w-12 mx-auto" src="/img/logo.png" />
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleSubmit(handleSingIn)}>
                  <div className="relative w-full mb-4">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-1"
                      htmlFor="email-login"
                    >
                      E-mail
                    </label>
                    <input
                      {...register('email')}
                      name="email"
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                      placeholder="E-mail"
                    />
                  </div>

                  <div className="relative w-full mb-2">
                    <label
                      className="block uppercase text-white text-xs font-bold mb-1"
                      htmlFor="password-login"
                    >
                      Senha
                    </label>
                    <input
                      {...register('password')}
                      name="password"
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 rounded text-sm shadow focus:outline-none focus:ring-gray-500 w-full ease-linear transition-all duration-150"
                      placeholder="Senha"
                    />
                  </div>
                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                      {...register('rememberme')}
                        id="customCheckLogin"
                        type="checkbox"
                        name="rememberme"
                        className="form-checkbox border-0 rounded text-emerald-700 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-white">
                        Lembre-se de mim
                      </span>
                    </label>
                  </div>

                  <div className="msg-erro mt-4">{error}</div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Entrar
                    </button>
                  </div>
                  <div className="w-full text-center mt-5">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="text-emerald-400"
                    >
                      <small>Esqueceu sua senha?</small>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Login.layout = Auth;