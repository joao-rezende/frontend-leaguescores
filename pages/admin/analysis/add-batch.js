import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Admin from "../../../layouts/Admin";
import Api from "../../../services/Api";

export default function AddBatchAnalysis() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const api = Api();

  async function handleInsert(data) {
    setIsSubmitting(true);
    const { result, message } = await api.post("/api/analysis/add-batch", data);

    setIsSubmitting(false);
    if (!result) {
      setGeneralError(message.join("<br>"));
      return false;
    }

    document.getElementById("uri-analysis").value = "";

    alert("Análise inserida com sucesso");
    router.push("/admin/analysis/add-batch");
  }

  return (
    <>
      <form onSubmit={handleSubmit(handleInsert)}>
        <div className="flex flex-wrap">
          <div className="w-full sm:w-6/12 pt-4 sm:pt-0">
            <span className={`z-2 leading-snug font-normal absolute text-center absolute bg-transparent rounded-full text-base items-center justify-center w-8 pl-3 py-3 ${errors.uri ? "text-red-300" : "text-gray-300"}`}>
              <i className="fas fa-link"></i>
            </span>
            <input
              id="uri-analysis"
              type="text"
              placeholder="Cadastrar novo jogo por URL"
              className={`px-3 py-3 text-white bg-gray-700 relative rounded-full text-sm shadow outline-none focus:ring-gray-500 w-6/12 pl-10 mr-2 ${errors.uri ? "border-red-300 border-1 placeholder-red-300 focus:border-red-300" : "border-0 placeholder-blueGray-500"}`}
              {...register('uri', { required: "Este campo é obrigatório" })}
            />
            <button type="submit" className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150">
              {isSubmitting && <span className="fas fa-circle-notch fa-spin mr-1"></span>}
              Adicionar
            </button>
          </div>
        </div>
      </form>

      <div className="flex flex-wrap mt-1">
        <div className="w-full mb-12 p-4 bg-gray-800 rounded">
          <iframe src="/api/games-academia" className="mx-auto rounded" style={{ width: 670, height: 500 }}></iframe>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx) => {
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

  return { props: {} };
}

AddBatchAnalysis.layout = Admin;
AddBatchAnalysis.titlePage = "Adicionar Análises em Lote";