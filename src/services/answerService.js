import { post, get, del, put } from "../utils/request"

export const createAnswer = async (options) => {
    const result = await post("Answer/Add", options);
    return result;  
}

export const getAllAnswer = async (questionId) => {
    const result = await get(`Answer/GetByQuestionId/${questionId}`);
    return result;  
}

export const deleteAnswer = async (id) => {
    const result = await del(`Answer/Delete/${id}`);
    return result;
}

export const updateAnswer = async (id, options) => {
    const result = await put(`Answer/Update/${id}`, options);
    return result;
}