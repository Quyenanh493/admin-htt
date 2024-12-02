import { get } from "../utils/request"

export const getRevenue = async () => {
    const result = await get(`DashBoard/GetAll`);
    return result;
}

export const getCountStudent = async (year) => {
    const result = await get(`DashBoard/GetStudentCountByMonth?year=${encodeURIComponent(year)}`);
    return result;
}

export const getProgress = async () => {
    const result = await get(`Progress/GetAll`);
    return result;
}

export const getCourseRev = async (year) => {
    const result = await get(`DashBoard/GetRevenueByCourse?year=${encodeURIComponent(year)}`);
    return result;
}
