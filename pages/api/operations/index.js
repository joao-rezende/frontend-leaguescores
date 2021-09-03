import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { offset } = req.body;

  const resOperation = await api.get(`${process.env.APIHOST}/operations?offset=${offset}`);

  res.status(200).json(resOperation)
}