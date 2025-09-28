const BASE_URL = "http://localhost:8080/cloud2share";

 export const apiEndpoints = {
  FETCH_FILES:`${BASE_URL}/files/my`,
  GET_CREDITS: `${BASE_URL}/users/credits`,
  TOGGLE_FILES: (id) => `${BASE_URL}/files/${id}/toggle-public`,
  DOWNLOAD_FILES: (id) => `${BASE_URL}/files/download/${id}`,
  DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,
  UPLOAD_FILE: `${BASE_URL}/files/upload`,


}