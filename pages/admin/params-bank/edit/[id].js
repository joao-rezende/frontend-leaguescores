import { parseCookies } from "nookies";
import { FormParamBank } from "../../../../components/Forms/FormParamBank";
import Admin from "../../../../layouts/Admin";
import Api from "../../../../services/Api";

export async function getServerSideProps(ctx) {
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

  const { params } = ctx;
  const { paramBank } = await api.get(`${host}/api/params-bank/${params.id}`);

  return { props: { paramBank } }
}

export default FormParamBank;

FormParamBank.layout = Admin;
FormParamBank.titlePage = "Editar Parâmetros da Banca";