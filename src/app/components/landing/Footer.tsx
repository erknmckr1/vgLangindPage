'"use client";'
import FadeInSection from "../ui/FadeInSection";

export default function Footer() {
  return (
    <FadeInSection>
      <footer className=" border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4 text-sm text-card-foreground">
          {/* 1. Sütun: Marka */}
          <div>
            <h3 className="text-lg font-bold text-primary mb-2">Vega</h3>
            <p className="text-foreground">Dijital mağazanı kur, markanı büyüt.</p>
          </div>

          {/* 2. Sütun: Hızlı Linkler */}
          <div>
            <h4 className="font-semibold mb-2 text-card-foreground">Bağlantılar</h4>
            <ul className="space-y-1">
              <li>
                <a href="#features" className="hover:text-blue-600 text-muted-foreground">
                  Özellikler
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-blue-600 text-muted-foreground">
                  Fiyatlandırma
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-blue-600 text-muted-foreground">
                  SSS
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600 text-muted-foreground">
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Sütun: Destek */}
          <div>
            <h4 className="font-semibold mb-2 ">Destek</h4>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-blue-600 text-muted-foreground">
                  Gizlilik Politikası
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 text-muted-foreground">
                  Kullanım Koşulları
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 text-muted-foreground">
                  Satıcı Paneli
                </a>
              </li>
            </ul>
          </div>

          {/* 4. Sütun: İletişim */}
          <div>
            <h4 className="font-semibold mb-2 ">İletişim</h4>
            <p className="text-muted-foreground">erknm.ckr@gmail.com</p>
            <p className="text-muted-foreground">+90 532 000 00 00</p>
          </div>
        </div>

        <div className="border-t border-gray-100 text-center text-xs text-gray-400 py-4">
          © {new Date().getFullYear()} Vega Platform – Tüm hakları saklıdır.
        </div>
      </footer>
    </FadeInSection>
  );
}
