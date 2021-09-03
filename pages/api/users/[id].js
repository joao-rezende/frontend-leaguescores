import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { id } = req.query;

  const resUser = await api.get(`${process.env.APIHOST}/users/${id}`);

  res.status(200).json(resUser)
}