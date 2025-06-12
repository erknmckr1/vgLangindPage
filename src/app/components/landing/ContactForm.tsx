"use client";

import { useState } from "react";
import { SendHorizonal } from "lucide-react";
import FadeInSection from "../ui/FadeInSection";
export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("İletişim Formu:", formData);
    setSubmitted(true);
  };

  return (
    <FadeInSection>
      <section
        id="contact"
        className="py-24 px-4 bg-background contact-gradient "
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="sm:text-4xl heading-xl text-center mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-muted-foreground mb-10">
            Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız.
          </p>

          {submitted ? (
            <div className="text-foreground text-base font-medium bg-green-100 border border-green-300 p-4 rounded-md shadow-sm transition-all duration-300">
              🎉 Teşekkürler! En kısa sürede size dönüş yapacağız.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 text-left bg-card p-6 rounded-xl shadow-md"
            >
              <div>
                <label className="block mb-1 text-sm font-semibold text-card-foreground">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Adınızı girin"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-card-foreground">
                  E-posta
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="ornek@eposta.com"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-semibold text-card-foreground">
                  Mesajınız
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Mesajınızı yazın..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full  py-3 font-medium btn-primary  rounded-lg not-first:flex items-center justify-center gap-2"
              >
                <SendHorizonal size={18} />
                Gönder
              </button>
            </form>
          )}
        </div>
      </section>
    </FadeInSection>
  );
}
