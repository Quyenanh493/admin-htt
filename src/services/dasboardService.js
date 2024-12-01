import { get } from "../utils/request"

export const getRevenue = async () => {
    const result = await get(`DashBoard/GetAll`);
    return result;
}
