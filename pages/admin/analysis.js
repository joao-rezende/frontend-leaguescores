import React from "react";
import { parseCookies } from "nookies";

// components

import CardTable from "../../components/Cards/CardTable";

// layout for page
import Admin from "../../layouts/Admin";

export default function Analysis() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <iframe className="relative bg-white rounded-md" src={`${process.env.APIHOST}/front/`} height={"500"} width={"100%"}></iframe>
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <CardTable color="dark" />
        </div>
      </div>
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

Analysis.layout = Admin;
Analysis.titlePage = "Análises";