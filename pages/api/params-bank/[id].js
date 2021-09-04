import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { id } = req.query;

  const resParamsBank = await api.get(`${process.env.APIHOST}/params-bank/${id}`);

  res.status(200).json(resParamsBank)
}