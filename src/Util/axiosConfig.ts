import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
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

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
