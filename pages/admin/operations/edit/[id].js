import { parseCookies } from "nookies";
import { FormOperations } from "../../../../components/Forms/FormOperations";
import Admin from "../../../../layouts/Admin";
import Api from '../../../../services/Api';

export async function getServerSideProps(ctx) {
  const api = Api();
  const host = (ctx.req.headers.referer.indexOf("https") == -1 ? "http" : "https") + "://" + ctx.req.headers.host;

  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const { user } = await api.get(host + `/api/users/${userID}`);

  if (!userID || !user || user.type != 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  const { bank } = await api.post(host + '/api/banks', { userID });
  
  const { params } = ctx;
  const { operation } = await api.get(host + `/api/operations/${params.id}`);

  return { props: { user, bank, operation } };
}

export default FormOperations;

FormOperations.layout = Admin;
FormOperations.titlePage = "Editar Parâmetros da Banca";