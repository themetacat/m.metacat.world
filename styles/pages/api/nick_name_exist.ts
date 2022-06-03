import api from '../../lib/api';

export default async (req, res) => {
  const { nickName } = req.query;
  const data = await api.nickNameExit(nickName);

  res.statusCode = 200;

  res.json(data);
};
