import Api from '../../services/Api';

export default async function handler(req, res) {
  const api = Api();

  const resGamesAcademia = await api.post(`${process.env.APIHOST}/analysis/games-academia`, req.body);

  res.status(200).send(resGamesAcademia.html);
}