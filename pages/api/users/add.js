import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resUser = await api.post(`${process.env.APIHOST}/users`, req.body);

  res.status(200).json(resUser)
}