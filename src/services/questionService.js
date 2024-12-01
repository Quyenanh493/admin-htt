import { post, get, del, put } from "../utils/request"

export const createQuestion = async (options) => {
    const result = await post("Question/AddQuestion", options);
    return result;  
}

export const getAllQuestion = async (quizId) => {
    const result = await get(`Question/GetAllByQuizId/${quizId}`);
    return result;  
}

export const deleteQuestion = async (id) => {
    const result = await del(`Question/Delete/${id}`);
    return result;
}

export const updateQuestion = async (id, options) => {
    const result = await put(`Question/UpdateQuestion/${id}`, options);
    return result;
}