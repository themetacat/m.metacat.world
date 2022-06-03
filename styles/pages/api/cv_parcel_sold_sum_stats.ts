import api from '../../lib/api';

export default async (req, res) => {
  const data = await api.getCvParcelSoldSumStats();

  res.statusCode = 200;

  res.json(data);
};
