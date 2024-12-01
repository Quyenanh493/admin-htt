import { post, get, del, put } from "../utils/request"

export const createInstructor = async (options) => {
    const result = await post("Instructor/AddInstructor", options);
    return result;  
}

export const getAllInstructorId = async () => {
    const result = await get("Instructor/GetAll");
    return result;  
}

export const deleteInstructor = async (id) => {
    const result = await del(`Instructor/Delete/${id}`);
    return result;
}

export const updateInstructor = async (id, options) => {
    const result = await put(`Instructor/Update/${id}`, options);
    return result;
}