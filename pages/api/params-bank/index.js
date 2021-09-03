import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { period } = req.body;

  const resParamsBank = await api.get(`${process.env.APIHOST}/params-bank?period=${period}`);

  res.status(200).json(resParamsBank)
}