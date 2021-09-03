import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { offset } = req.body;

  const resUser = await api.get(`${process.env.APIHOST}/users?offset=${offset}`);

  res.status(200).json(resUser)
}