import * as qs from 'qs';

class API {
  private url: string;

  private key?: string;

  constructor(url: string, key?: string) {
    this.url = url;
    this.key = key;
  }

  // 设置单个或批量出租

  // 4.4 获取 builders 列表接口

  public async req_buid_builders_list() {
    // const url = `${this.url}/get_build_builders_list`
    const url = `${this.url}/get_build_builders_list`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();
    return json;
  }

  // 9.7 获取 Wearable creator 数据接口
  public async req_wearable_creators() {
    const url = `${this.url}/wearable/get_wearable_creators`;

    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }

  // 4.2 获取 Topic 详情页信息接口

  public async req_topic_detail(id: number, creator: string) {
    let search = null;
    if (id) {
      search = qs.stringify({ id }, { addQueryPrefix: true });
    } else {
      search = qs.stringify({ creator }, { addQueryPrefix: true });
    }
    const url = `${this.url}/get_topic_detail${search}`;
    const result = await fetch(url, {
      method: 'get',
      mode: 'cors',
    });
    const json = await result.json();

    return json;
  }
}

export default new API('http://8.130.23.16/api/v1');
