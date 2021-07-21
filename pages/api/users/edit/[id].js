import Api from '../../../../services/Api';

export default async function handler(req, res) {
  const { id } = req.query;
  const api = Api();

  const resUser = await api.put(`${process.env.APIHOST}/users/${id}`, req.body);

  res.status(200).json(resUser)
}