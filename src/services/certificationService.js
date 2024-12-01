import { post, get, del, put } from "../utils/request"

export const createCertification = async (options) => {
    const result = await post("CertificationTemplate", options);
    return result;  
}

export const getAllCertification = async () => {
    const result = await get("CertificationTemplate");
    return result;
}

export const deleteCertification = async (id) => {
    const result = await del(`CertificationTemplate/${id}`);
    return result;
}

export const updateCertification = async (id, options) => {
    const result = await put(`CertificationTemplate/${id}`, options);
    return result;
}