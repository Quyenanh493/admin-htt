import { post, get, del, put } from "../utils/request"

export const createLesson = async (options) => {
    const result = await post("Lesson", options);
    return result;  
}

export const getLesson = async (courseId) => {
    const result = await get(`Lesson/GetLessonByCourseId/${courseId}`);
    return result;
}

export const deleteLesson = async (id) => {
    const result = await del(`Lesson/DeleteLesson/${id}`);
    return result;
}

export const updateLesson = async (id, options) => {
    const result = await put(`Lesson/UpdateLesson/${id}`, options);
    return result;
}