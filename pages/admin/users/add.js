import { parseCookies } from "nookies";
import { FormUser } from "../../../components/Forms/FormUser";
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

export default FormUser;

FormUser.layout = Admin;
FormUser.titlePage = "Incluir Usuário";