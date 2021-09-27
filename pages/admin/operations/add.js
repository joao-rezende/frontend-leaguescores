import { parseCookies } from "nookies";
import { FormOperations } from "../../../components/Forms/FormOperations";
import Admin from "../../../layouts/Admin";
import Api from "../../../services/Api.js";

export const getServerSideProps = async (ctx) => {
  const api = Api();
  const host = (ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user } = await api.get(host + `/api/users/${userID}`);

  if (!userID) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  const { bank } = await api.post(host + '/api/banks', { userID });

  return { props: { user, bank } };
}

export default FormOperations;

FormOperations.layout = Admin;
FormOperations.titlePage = "Incluir Operação";