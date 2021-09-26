import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { offset } = req.body;

  const resAnalysis = await api.get(`${process.env.APIHOST}/analysis?offset=${offset}`);

  res.status(200).json(resAnalysis);
}