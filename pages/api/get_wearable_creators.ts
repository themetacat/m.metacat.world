// 9.7 获取 Wearable creator 数据接口

import api from '../../lib/test';

export default async (req, res) => {
  const data = await api.req_wearable_creators();

  res.statusCode = 200;

  res.json(data);
};
