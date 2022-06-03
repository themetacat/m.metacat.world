import api from '../../lib/api';

export default async (req, res) => {
  const token = req.headers.authorization;
  const data = await api.getParcelList2(token);
  res.statusCode = 200;

  res.json(data);
};
