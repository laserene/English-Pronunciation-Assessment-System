import axiosInstance from "./axios.ts";
import { authStore } from "./authStore.ts";

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

        authStore.setToken(newAccessToken);
        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);
    } catch (err) {
        processQueue(err, null);
        authStore.clearToken();
        window.location.href = "auth/login";
        return Promise.reject(err);
    } finally {
        isRefreshing = false;
    }
  }
);
