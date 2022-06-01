// 9.7 获取 Wearable creator 数据接口

import api from '../../lib/test';

export default async (req, res) => {
  const { id, creator } = req.query;
  const data = await api.req_topic_detail(id, creator);

  res.statusCode = 200;

  res.json(data);
};
