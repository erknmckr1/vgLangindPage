import HeroSection from "./components/HeroSection";
import Features from "./components/features/FeatureSection";
import FaqList from "./components/Faq/Faq";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import ThemeCarousel from "./components/TemplateCarousel/TemplateCarousel";
import ScrollProgressBar from "./components/ui/ScrollProgressBar";
export default function Home() {
  return (
    <>
    <ScrollProgressBar />
      <HeroSection />
      <Features/>
      <ThemeCarousel/>
      <FaqList/>
      <ContactForm/>
      <Footer/>
    </>
  );
}
