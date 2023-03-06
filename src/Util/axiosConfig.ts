import axios from "axios";

// Add a request interceptor
const axiosJwt = axios.create({})
axiosJwt.interceptors.request.use(
  function (config) {
    const jwtJson = localStorage.getItem("token"); // Lấy token từ Redux state
    const jwt = jwtJson ? JSON.parse(jwtJson) : {};
    // Nếu JWT tồn tại, thêm Authorization header chứa JWT vào config.headers
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
    console.log("vao day");
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosJwt;