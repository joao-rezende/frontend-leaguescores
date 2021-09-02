import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resBanks = await api.post(`${process.env.APIHOST}/banks`, req.body);

  res.status(200).json(resBanks);
}