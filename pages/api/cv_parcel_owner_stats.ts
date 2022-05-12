import api from '../../lib/api';

export default async (req, res) => {
  const data = await api.getCvParcelOwnerStats();

  res.statusCode = 200;

  res.json(data);
};
