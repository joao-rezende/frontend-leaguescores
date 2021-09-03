import Api from '../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resLogin = await api.post(`${process.env.APIHOST}/login`, req.body);

  res.status(200).json(resLogin)
}