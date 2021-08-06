import Api from '../../../../services/Api';

export default async function handler(req, res) {
  const { id } = req.query;
  const api = Api();

  const resParamsBank = await api.put(`${process.env.APIHOST}/params-bank/${id}`, req.body);

  res.status(200).json(resParamsBank)
}