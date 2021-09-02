import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import UserDropdown from "../Dropdowns/UserDropdown";
import { AuthContext } from "../../contexts/AuthContext";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();

  return (
    <>
    <div className={"modal-backdrop z-2 fixed top-0 left-0 right-0 " + collapseShow}></div>
      <nav className={"sidebar-admin md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden bg-gray-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"}>
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-emerald-200 opacity-100 md:hidden px-3 py-2 text-xl leading-none bg-gray-700 rounded shadow-lg"
            type="button"
            onClick={() => setCollapseShow("bg-gray-800 m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="/"
              className="md:block text-left text-white mr-0 inline-block whitespace-nowrap text-sm font-bold p-0 px-0 border-gray-400"
            >
              <span className="logo-desktop text-center mb-6"><img alt="Logo Empresa" className="h-12 inline-block" src="/img/logo.png" /></span>
              <span className="logo-collapse text-center mb-6"><img alt="Logo Empresa" className="h-12 mx-auto" src="/img/logo.png" /></span>
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow fixed top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-2 mb-4 border-b border-solid border-gray-700">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#"
                      className="md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-md font-bold p-1 px-0"
                    >
                      LeagueScores
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-emerald-200 opacity-100 md:hidden px-3 py-1 text-xl leading-none bg-gray-700 rounded"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Navigation */}

            <ul className="md:flex-col md:min-w-full flex flex-col list-none sidebar">
              <li className="items-center">
                <Link href="/admin/home">
                  <a
                    href="#"
                    onClick={() => setCollapseShow("hidden")}
                    className={
                      "text-xs py-2 block px-3 font-medium " +
                      (router.pathname.indexOf("/admin/home") !== -1
                        ? "bg-emerald-800 bg-opacity-30 text-emerald-500 hover:bg-emerald-600 rounded-md"
                        : "text-gray-600 hover:text-gray-400")
                    }
                  >
                    <i className={"fas fa-home mr-4 text-lg"}></i>{" "}
                    <span className={"text-sidebar"}>Início</span>
                  </a>
                </Link>
              </li>

              {
                user &&
                user.type == 1 &&
                <li className="items-center">
                  <Link href="/admin/users">
                    <a
                      href="#"
                      onClick={() => setCollapseShow("hidden")}
                      className={
                        "text-xs py-2 block px-3 font-medium " +
                        (router.pathname.indexOf("/admin/users") !== -1
                          ? "bg-emerald-800 bg-opacity-30 text-emerald-500 hover:bg-emerald-600 rounded-md"
                          : "text-gray-600 hover:text-gray-400")
                      }
                    >
                      <i className={"fas fa-users mr-4 text-lg"}></i>{" "}
                      <span className={"text-sidebar"}>Usuários</span>
                    </a>
                  </Link>
                </li>
              }

              {
                user &&
                user.type == 1 &&
                <li className="items-center">
                  <Link href="/admin/analysis">
                    <a
                      href="#"
                      onClick={() => setCollapseShow("hidden")}
                      className={
                        "text-xs py-2 block px-3 font-medium " +
                        (router.pathname.indexOf("/admin/analysis") !== -1
                          ? "bg-emerald-800 bg-opacity-30 text-emerald-500 hover:bg-emerald-600 rounded-md"
                          : "text-gray-600 hover:text-gray-400")
                      }
                    >
                      <i className={"fas fa-chart-line mr-4 text-lg"}></i>{" "}
                      <span className={"text-sidebar"}>Análises</span>
                    </a>
                  </Link>
                </li>
              }

              {
                user &&
                user.type == 1 &&
                <li className="items-center">
                  <Link href="/admin/params-bank">
                    <a
                      href="#"
                      onClick={() => setCollapseShow("hidden")}
                      className={
                        "text-xs py-2 block px-3 font-medium " +
                        (router.pathname.indexOf("/admin/params-bank") !== -1
                          ? "bg-emerald-800 bg-opacity-30 text-emerald-500 hover:bg-emerald-600 rounded-md"
                          : "text-gray-600 hover:text-gray-400")
                      }
                    >
                      <i className={"fas fa-sliders-h mr-4 text-lg"}></i>{" "}
                      <span className={"text-sidebar"}>Parâmetros da Banca</span>
                    </a>
                  </Link>
                </li>
              }

              <li className="items-center">
                <Link href="/admin/bank-management">
                  <a
                    href="#"
                    onClick={() => setCollapseShow("hidden")}
                    className={
                      "text-xs py-2 block px-3 font-medium " +
                      (router.pathname.indexOf("/admin/bank-management") !== -1
                        ? "bg-emerald-800 bg-opacity-30 text-emerald-500 hover:bg-emerald-600 rounded-md"
                        : "text-gray-600 hover:text-gray-400")
                    }
                  >
                    <i className={"fas fa-chart-area mr-4 text-lg"}></i>{" "}
                    <span className={"text-sidebar"}>Gestão da Banca</span>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
