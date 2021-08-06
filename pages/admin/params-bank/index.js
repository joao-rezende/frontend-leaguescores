import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import Admin from "../../../layouts/Admin.js";
import CardTable from "../../../components/Cards/CardTable";
import LineParamsBank from "../../../components/Lines/LineParamsBank.js";
import { Link } from "../../../components/Links/Link";
import { ConfirmModal } from "../../../components/Modals/ConfirmModal.js";
import { LoadModal } from "../../../components/Modals/LoadModal.js";
import Api from "../../../services/Api.js";

const ParamsBank = () => {
  const api = Api();
  const [paramsBank, setParamsBank] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [showLoadDelete, setShowLoadDelete] = useState(false);
  const [completeLoadDelete, setCompleteLoadDelete] = useState(false);

  async function listParamsBank(page = 1) {
    const offset = (page - 1) * 25;
    fetch(`${process.env.APIHOST}/params-bank?offset=${offset}`).then(async res => {
      const { paramsBank, total } = await res.json();
      setParamsBank(paramsBank);
    });
  }

  function deleteParam(e) {
    const { id } = e.target.dataset;
    setActivateId(id);
    setShowConfirmActivate(true);
  }

  async function confirmDelete() {
    setShowConfirmDelete(false);
    setShowLoadDelete(true);

    // const { result, message } = await api.post(`/api/users/edit/${activateId}`, { status: true });

    // if (!result) {
    //   console.error(message);
    //   return false;
    // }

    setCompleteLoadDelete(true);
    listParamsBank();
  }

  useEffect(() => {
    listParamsBank();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-4/12 md:w-5/12 pr-4">
          <div className="margin-top-link">
            <Link href="/admin/params-bank/add" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 padding-link rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Adicionar</Link>
          </div>
        </div>
        <div className="w-8/12 md:w-7/12 pl-4 text-right">
          <span className="z-10 leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded-full text-base items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar parâmetro de banca..."
            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 relative rounded-full text-sm shadow outline-none focus:outline-none focus:ring-gray-500 w-full xl:w-5/12 pl-10"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        <div className="w-full mb-12">
          <CardTable
            color="dark"
            columns={["Nome", "Dia início", "Dia fim", "Real", "Mínima", "Máxima", "Coeficiente real", "Coenficiente mínimo", "Coeficiente máximo", ""]}
            Line={LineParamsBank}
            lines={paramsBank}
          />
        </div>
      </div>
      <LoadModal show={showLoadDelete} setShow={setShowLoadDelete} completeLoad={completeLoadDelete}>{!completeLoadDelete ? "Deletando parâmetro de banca" : "Parâmetro de banca deletado"}</LoadModal>
      <ConfirmModal show={showConfirmDelete} onConfirm={confirmDelete} onCancel={() => setShowConfirmDelete(false)}>
        Deseja realmente deletar o parâmetro de banca?
      </ConfirmModal>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const res = await fetch(`${process.env.APIHOST}/users/${userID}`);
  const { user } = await res.json();

  if (!userID || !user || user.type != 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: {} };
}

export default ParamsBank;

ParamsBank.layout = Admin;
ParamsBank.titlePage = "Parâmetros da Banca";