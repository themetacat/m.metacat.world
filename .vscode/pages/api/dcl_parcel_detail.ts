import api from '../../lib/api';

export default async (req, res) => {
  const { landId } = req.query;
  const data = await api.getDclParcelDetail(landId);

  res.statusCode = 200;

  res.json(data);
};
