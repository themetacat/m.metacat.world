import api from '../../lib/api';

export default async (req, res) => {
  const { id, map_type, time_range } = req.query;
  const data = await api.getCvParcelDetail(id, map_type, time_range);

  res.statusCode = 200;

  res.json(data);
};
