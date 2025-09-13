const BASE_URL = "http://localhost:8080/cloud2share";

 export const apiEndpoints = {
  FETCH_FILES:`${BASE_URL}/files/my`,
  TOGGLE_FILES: (id) => `${BASE_URL}/files/${id}/toggle-public`,
  DOWNLOAD_FILES: (id) => `${BASE_URL}/files/download/${id}`,
 DELETE_FILE: (id) => `${BASE_URL}/files/${id}`,
}