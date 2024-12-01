import { post, get, del, put } from "../utils/request"

export const createQuiz = async (options) => {
    const result = await post("Quizz", options);
    return result;  
}

export const getAllQuiz = async (id) => {
    const result = await get(`Quizz/GetByCourseId/${id}`);
    return result;  
}

export const deleteQuiz = async (id) => {
    const result = await del(`Quizz/${id}`);
    return result;
}

export const updateQuiz = async (id, options) => {
    const result = await put(`Quizz/${id}`, options);
    return result;
}