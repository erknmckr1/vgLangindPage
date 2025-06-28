import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000", // backend URL’in neyse onu yaz
  withCredentials: true, // refresh_token cookie olarak gönderilsin
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      )
    ) {
      originalRequest._retry = true;

      try {
        await instance.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
        ); // Cookie'den token alınacak

        // Refresh başarılıysa orijinal isteği tekrar dene
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh işlemi başarısız:", refreshError);
        // Logout veya yönlendirme işlemini burada tetikleyebilirsin
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
