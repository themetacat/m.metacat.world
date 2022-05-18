
import api from '../../lib/z_api';

export default async (req, res) => {

    const { id } = req.query;
    const data = await api.req_pfp_detail(id);
    res.statusCode = 200;

    res.json(data);
};
