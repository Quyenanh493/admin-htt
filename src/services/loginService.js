import { post } from "../utils/request"
export const login = async (values) => {
    const result = await post(`Account/Login`, values);
    return result;
}