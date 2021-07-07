import { parseCookies } from "nookies";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext.js";

import Admin from "../../layouts/Admin.js";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-gray-800 w-full mb-6 shadow-xl rounded-lg">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <div id="image-default-profile" className="bg-gray-700 shadow-xl inline-flex items-center justify-center rounded-full h-auto border-none text-emerald-200 -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                      <i className="fas fa-user align-middle"></i>
                    </div>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-emerald-500 active:bg-emerald-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Continuar Curso
                      </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        22
                        </span>
                      <span className="text-xs text-gray-200">
                        Aulas finalizadas
                        </span>
                    </div>
                    <div className="p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-white">
                        10
                        </span>
                      <span className="text-sm text-gray-200">
                        Aulas restantes
                        </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12 mb-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-white mb-2">
                  {user ? user.name : ''}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-gray-200 font-bold uppercase">
                  <i className="far fa-envelope mr-2 text-lg text-whi"></i>{" "}
                  {user ? user.email : ''}
                </div>
                <div className="mb-2 mt-10">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-gray-200 bg-gray-600">
                  Progresso Atual
                  </span>
                </div>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-5 mt-4 mb-4 text-xs flex rounded-lg bg-emerald-200">
                    <div style={{width: '68.76%'}} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500">65,76%</div>
                  </div>
                </div>
                <div className="mb-2 text-gray-200">
                  Módulo 3 - Aula 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
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

Home.layout = Admin;
Home.titlePage = "Início";