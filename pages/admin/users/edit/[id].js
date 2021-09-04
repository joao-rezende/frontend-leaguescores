import { parseCookies } from "nookies";
import { FormUser } from "../../../../components/Forms/FormUser";
import Admin from "../../../../layouts/Admin";
import Api from "../../../../services/Api";

export async function getServerSideProps(ctx) {
  const api = Api();
  const host = (ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user: userLogged } = await api.get(`${host}/api/users/${userID}`);

  if (!userID || !userLogged || userLogged.type != 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { params } = ctx;
  const { user } = await api.get(`${host}/api/users/${params.id}`);

  return { props: { user } }
}

export default FormUser;

FormUser.layout = Admin;
FormUser.titlePage = "Editar Usuários";