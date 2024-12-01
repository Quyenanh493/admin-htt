import { post, get, del, put } from "../utils/request"

export const createCourse = async (options) => {
    const result = await post("Course/AddCourse", options);
    return result;  
}

export const getCourse = async () => {
    const result = await get("Course/GetAllCourse/false");
    return result;
}

export const deleteCourse = async (id) => {
    const result = await del(`Course/Delete/${id}`);
    return result;
}

export const updateCourse = async (id, options) => {
    const result = await put(`Course/Update/${id}`, options);
    return result;
}