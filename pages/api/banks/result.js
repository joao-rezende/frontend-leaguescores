import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { userID } = req.body;

  const resBank = await api.post(`${process.env.APIHOST}/banks/result`, { userID });

  res.status(200).json(resBank)
}