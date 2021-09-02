import { parseCookies } from "nookies";
import { FormOperations } from "../../../components/Forms/FormOperations";
import Admin from "../../../layouts/Admin";
import Api from "../../../services/Api.js";

export const getServerSideProps = async (ctx) => {
  const api = Api();

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user } = await api.get(`${process.env.APIHOST}/users/${userID}`);

  if (!userID || !user || user.type != 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  const { bank } = await api.get(`${process.env.APIHOST}/banks?userID=${userID}`);

  return { props: { user, bank } };
}

export default FormOperations;

FormOperations.layout = Admin;
FormOperations.titlePage = "Incluir Operação";