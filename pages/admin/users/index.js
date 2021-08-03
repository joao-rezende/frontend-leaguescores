import React, { useEffect, useState } from "react";
import { parseCookies } from "nookies";

import Admin from "../../../layouts/Admin.js";
import CardTable from "../../../components/Cards/CardTable";
import LineUser from "../../../components/Lines/LineUser";
import { Link } from "../../../components/Links/Link";
import { ConfirmModal } from "../../../components/Modals/ConfirmModal.js";
import { LoadModal } from "../../../components/Modals/LoadModal.js";
import Api from "../../../services/Api.js";

const Users = () => {
  const api = Api();
  const [inactivateId, setInactivateId] = useState(null);
  const [showConfirmInactivate, setShowConfirmInactivate] = useState(false);
  const [showLoadInactivate, setShowLoadInactivate] = useState(false);
  const [completeLoadInactivate, setCompleteLoadInactivate] = useState(false);
  const [activateId, setActivateId] = useState(null);
  const [showConfirmActivate, setShowConfirmActivate] = useState(false);
  const [showLoadActivate, setShowLoadActivate] = useState(false);
  const [completeLoadActivate, setCompleteLoadActivate] = useState(false);
  const [users, setUsers] = useState([]);

  async function listUsers(page = 1) {
    const offset = (page - 1) * 25;
    fetch(`${process.env.APIHOST}/users?offset=${offset}`).then(async res => {
      const { users, total } = await res.json();
      setUsers(users);
    });
  }

  function activateUser(e) {
    const { id } = e.target.dataset;
    setActivateId(id);
    setShowConfirmActivate(true);
  }

  async function confirmActivate() {
    setShowConfirmActivate(false);
    setShowLoadActivate(true);

    const { result, message } = await api.post(`/api/users/edit/${activateId}`, { status: true });

    if (!result) {
      console.error(message);
      return false;
    }

    setCompleteLoadActivate(true);
    listUsers();
  }

  function inactivateUser(e) {
    const { id } = e.target.dataset;
    setInactivateId(id);
    setShowConfirmInactivate(true);
  }

  async function confirmInactivate() {
    setShowConfirmInactivate(false);
    setShowLoadInactivate(true);

    const { result, message } = await api.post(`/api/users/edit/${inactivateId}`, { status: false });

    if (!result) {
      console.error(message);
      return false;
    }

    setCompleteLoadInactivate(true);
    listUsers();
  }

  useEffect(() => {
    listUsers();
  }, []);

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-4/12 md:w-5/12 pr-4">
          <div className="margin-top-link">
            <Link href="/admin/users/add" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 padding-link rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">Adicionar</Link>
          </div>
        </div>
        <div className="w-8/12 md:w-7/12 pl-4 text-right">
          <span className="z-10 leading-snug font-normal absolute text-center text-gray-300 absolute bg-transparent rounded-full text-base items-center justify-center w-8 pl-3 py-3">
            <i className="fas fa-search"></i>
          </span>
          <input
            type="text"
            placeholder="Buscar usuário..."
            className="border-0 px-3 py-3 placeholder-blueGray-500 text-white bg-gray-700 relative rounded-full text-sm shadow outline-none focus:outline-none focus:ring-gray-500 w-full xl:w-5/12 pl-10"
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-3">
        <div className="w-full mb-12">
          <CardTable
            color="dark"
            columns={["Status", "Nome", "Data de cadastro", ""]}
            onInactivate={inactivateUser}
            onActivate={activateUser}
            Line={LineUser}
            lines={users}
          />
        </div>
      </div>
      <LoadModal show={showLoadInactivate} setShow={setShowLoadInactivate} completeLoad={completeLoadInactivate}>{!completeLoadInactivate ? "Inativando usuário" : "Usuário inativado"}</LoadModal>
      <ConfirmModal show={showConfirmInactivate} onConfirm={confirmInactivate} onCancel={() => setShowConfirmInactivate(false)}>
        Deseja realmente inativar o usuário?
      </ConfirmModal>
      <LoadModal show={showLoadActivate} setShow={setShowLoadActivate} completeLoad={completeLoadActivate}>{!completeLoadActivate ? "Ativando usuário" : "Usuário ativado"}</LoadModal>
      <ConfirmModal show={showConfirmActivate} onConfirm={confirmActivate} onCancel={() => setShowConfirmActivate(false)}>
        Deseja realmente ativar o usuário?
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

export default Users;

Users.layout = Admin;
Users.titlePage = "Usuários";