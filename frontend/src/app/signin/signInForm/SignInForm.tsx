"use client";

import { Input } from "src/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "src/components/ui/button";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "src/lib/axios";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const userAgent = navigator.userAgent;
        await axios.post(`${process.env.NEXT_PUBLIC_API_LOG_URL}/logs/login`, {
          userId: response?.data.data.userId, // TODO: login cevabına eklersen gerçek ID olur
          userAgent,
        });
        router.push("/dashboard/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-muted flex items-center justify-center px-4">
      <div className="bg-card w-full max-w-md rounded-2xl shadow-lg p-8 space-y-6">
        <div className="space-y-1 text-center">
          <h2 className="text-2xl font-bold tracking-tight">Giriş Yap</h2>
          <p className="text-sm text-muted-foreground">
            Hesabınıza erişmek için giriş yapın
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="ornek@mail.com"
              className="py-4"
              value={formData.email}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="space-y-2 relative">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className="py-4 pr-10"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute top-10 right-3 text-muted-foreground hover:text-primary transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <Button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 mt-4 rounded hover:opacity-90 transition cursor-pointer"
          >
            Giriş Yap
          </Button>
        </form>
        <div className="text-left text-sm text-muted-foreground">
          Hesabınız yok mu?{" "}
          <a href="/signup" className="underline">
            Kayıt Ol
          </a>
        </div>
      </div>
    </div>
  );
}
