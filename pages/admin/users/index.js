import React from "react";

// components

// layout for page
import Admin from "layouts/Admin.js";
import CardTable from "components/Cards/CardTable";
import { withIronSession } from "next-iron-session";
import LineUser from "components/Lines/LineUser";
import { Link } from "components/Links/Link";

async function listUsers(page) {
  const offset = (page - 1) * 25;
  const res_json = await fetch(`${process.env.APIHOST}/users?offset=${offset}`);
  const res = await res_json.json();

  return res.users;
}

const Users = ({ users }) => {
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
            Line={LineUser}
            lines={users}
          />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    const user = req.session.get("user");

    if (!user || user.length == 0) {
      res.writeHead(302, { Location: '/' });
      res.end();
      return { props: {} };
    }

    const users = await listUsers(1);

    return { props: { users } };
  },
  process.env.CONFIGCOOKIE
);

export default Users;

Users.layout = Admin;
Users.titlePage = "Usuários";