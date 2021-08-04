import { parseCookies } from "nookies";
import { FormUser } from "../../../../components/Forms/FormUser";
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
  const res = await fetch(`${process.env.APIHOST}/users/${params.id}`);
  const { user } = await res.json();

  return { props: { user } }
}

export default FormUser;

FormUser.layout = Admin;
FormUser.titlePage = "Editar Usuários";