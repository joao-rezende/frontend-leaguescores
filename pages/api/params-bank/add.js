import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resParamsBank = await api.post(`${process.env.APIHOST}/params-bank`, req.body);

  res.status(200).json(resParamsBank)
}