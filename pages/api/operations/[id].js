import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { id } = req.query;

  const resOperations = await api.get(`${process.env.APIHOST}/operations/${id}`);

  res.status(200).json(resOperations)
}