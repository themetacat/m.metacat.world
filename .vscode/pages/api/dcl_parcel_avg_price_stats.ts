import api from '../../lib/api';

export default async (req, res) => {
  const data = await api.getDclParcelAvgPriceStats();

  res.statusCode = 200;

  res.json(data);
};
