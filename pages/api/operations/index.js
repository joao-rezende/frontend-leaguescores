import Api from '../../../services/Api';

export default async function handler(req, res) {
  const api = Api();
  const { offset, userID } = req.body;

  const resOperation = await api.get(`${process.env.APIHOST}/operations?offset=${offset}&userid=${userID}`);

  res.status(200).json(resOperation)
}