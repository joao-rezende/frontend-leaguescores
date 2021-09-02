import Api from '../../../../services/Api';

export default async function handler(req, res) {
  const { id } = req.query;
  const api = Api();

  const resOperation = await api.put(`${process.env.APIHOST}/operations/${id}`, req.body);

  res.status(200).json(resOperation)
}