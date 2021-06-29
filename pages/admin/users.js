import React from "react";

// components

// layout for page
import Admin from "layouts/Admin.js";
import CardTable from "components/Cards/CardTable";
import { withIronSession } from "next-iron-session";
import LineUser from "components/Lines/LineUser";

async function listUsers(page) {
  const offset = (page - 1) * 25;
  const res_json = await fetch(`${process.env.APIHOST}/users?offset=${offset}`);
  const res = await res_json.json();

  return res.users;
}

const Users = ({ users }) => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
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