import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { period, offset } = req.body;

  const resParamsBank = await api.get(`${process.env.APIHOST}/params-bank?period=${period ?? ''}&offset=${offset ?? 0}`);

  res.status(200).json(resParamsBank)
}