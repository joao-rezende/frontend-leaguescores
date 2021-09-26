import { parseCookies } from "nookies";
import Admin from "../../../layouts/Admin";
import Api from "../../../services/Api";

export default function AddAnalysis() {
    return (
        <>
        </>
    )
}

export const getServerSideProps = async (ctx) => {
  const api = Api();
  const host = (ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user } = await api.get(`${host}/api/users/${userID}`);

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

AddAnalysis.layout = Admin;
AddAnalysis.titlePage = "Adicionar Análises";