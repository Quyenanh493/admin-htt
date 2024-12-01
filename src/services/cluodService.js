import { postFormData } from "../utils/request"

export const postImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 
  const result = await postFormData("Cloud/upload/image", formData);
  return result;
};

export const postVideo = async (file) => {
  const formData = new FormData();
  formData.append("file", file); 
  const result = await postFormData("Cloud/upload/video", formData);
  return result;
};