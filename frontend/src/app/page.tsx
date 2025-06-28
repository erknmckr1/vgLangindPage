import HeroSection from "./components/landing/HeroSection";
import Features from "./components/landing/features/FeatureSection";
import FaqList from "./components/landing/Faq/Faq";
import ContactForm from "./components/landing/ContactForm";
import Footer from "./components/landing/Footer";
import ThemeCarousel from "./components/landing/TemplateCarousel/TemplateCarousel";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
export default function Home() {
  return (
    <>
      <ScrollProgressBar />
      <HeroSection />
      <Features />
      <ThemeCarousel />
      <FaqList />
      <ContactForm />
      <Footer />
    </>
  );
}
