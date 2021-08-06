import { parseCookies } from "nookies";
import { FormParamBank } from "../../../components/Forms/FormParamBank";
import Admin from "../../../layouts/Admin";

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

export default FormParamBank;

FormParamBank.layout = Admin;
FormParamBank.titlePage = "Incluir Parâmetro de Banca";