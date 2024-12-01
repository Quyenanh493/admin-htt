import { post, get, del, put } from "../utils/request"

export const createCategory = async (options) => {
    const result = await post("Category", options);
    return result;  
}

export const getAllCategoryId = async () => {
    const result = await get("Category/GetAllCategory");
    return result;
}

export const deleteCategory = async (id) => {
    const result = await del(`Category/${id}`);
    return result;
}

export const updateCategory = async (id, options) => {
    const result = await put(`Category/Update/${id}`, options);
    return result;
}