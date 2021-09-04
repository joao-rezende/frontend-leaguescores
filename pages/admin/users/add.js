import { parseCookies } from "nookies";
import { FormUser } from "../../../components/Forms/FormUser";
import Admin from "../../../layouts/Admin";
import Api from "../../../services/Api";

export const getServerSideProps = async (ctx) => {
  const api = Api();
  const host = (ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user }  = await api.get(host + `/api/users/${userID}`);

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