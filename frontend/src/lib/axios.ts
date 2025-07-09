import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // refresh_token cookie olarak gönderilsin
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Tarayıcı ortamında çalıştığını ve daha önce retry yapılmadığını kontrol et
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined" &&
      document.cookie.includes("refresh_token") // refresh_token varsa
    ) {
      originalRequest._retry = true;

      try {
        // refresh-token endpoint’ine istek at
        await instance.post("/auth/refresh-token");

        // refresh başarılıysa orijinal isteği tekrar et
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh işlemi başarısız:", refreshError);

        // Token yenilenemezse login sayfasına yönlendir
        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
