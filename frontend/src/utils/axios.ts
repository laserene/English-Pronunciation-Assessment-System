import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional (for cookies / refresh token)
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});


let isRefreshing = false;
let failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (error) prom.reject(error);
    else prom.resolve(token);
    });
    failedQueue = [];
};

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
        console.log("Interceptor error:", error);
        return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        }).then(() => axiosInstance(originalRequest));
    }

    isRefreshing = true;

    try {
        const res = await axiosInstance.post("/auth/refresh");
        const newAccessToken = res.data.access_token;

        localStorage.setItem("access_token", newAccessToken);
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
    } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("access_token");
        window.location.href = "login";
        return Promise.reject(err);
    } finally {
        isRefreshing = false;
    }
  }
);

export default axiosInstance;
