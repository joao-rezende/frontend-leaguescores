import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resOperations = await api.post(`${process.env.APIHOST}/operations`, req.body);

  res.status(200).json(resOperations);
}