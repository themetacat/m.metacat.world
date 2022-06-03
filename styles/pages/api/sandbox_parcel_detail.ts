import api from '../../lib/api';

export default async (req, res) => {
  const { tokenId } = req.query;
  const data = await api.getSandboxParcelDetail(tokenId);

  res.statusCode = 200;

  res.json(data);
};
