import { parseCookies } from "nookies";
import { FormParamBank } from "../../../../components/Forms/FormParamBank";
import Admin from "../../../../layouts/Admin";

export async function getServerSideProps(ctx) {
  const { ['leaguescores.token']: userID } = parseCookies(ctx);
  const resJsonLogged = await fetch(`${process.env.APIHOST}/users/${userID}`);
  const resLogged = await resJsonLogged.json();
  const userLogged = resLogged.user;

  if (!userID || !userLogged || userLogged.type != 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const { params } = ctx;
  const res = await fetch(`${process.env.APIHOST}/params-bank/${params.id}`);
  const { paramBank } = await res.json();

  return { props: { paramBank } }
}

export default FormParamBank;

FormParamBank.layout = Admin;
FormParamBank.titlePage = "Editar Parâmetros da Banca";