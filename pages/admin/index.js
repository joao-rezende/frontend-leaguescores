import React from "react";

// components

// layout for page
import Admin from "layouts/Admin.js";
import CardTable from "components/Cards/CardTable";
import { withIronSession } from "next-iron-session";

const Dashboard = ({ user }) => {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-800 border-0">
        <div className="px-4 py-5">
          <p className="relative text-white">Olá, {user && user.name ? user.email : ""}!</p>
        </div>
      </div>

      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12">
          <CardTable color="dark" />
        </div>
      </div>
      {/* <div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div> */}
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

    return {
      props: { user }
    };
  },
  process.env.CONFIGCOOKIE
);

export default Dashboard;

Dashboard.layout = Admin;
Dashboard.titlePage = "Usuários";