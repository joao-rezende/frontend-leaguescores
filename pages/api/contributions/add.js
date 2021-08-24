import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resContributions = await api.post(`${process.env.APIHOST}/contributions`, req.body);

  res.status(200).json(resContributions);
}