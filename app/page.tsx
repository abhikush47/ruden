import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import TransformationGallery from "@/components/sections/TransformationGallery";
import ProgramCards from "@/components/sections/ProgramCards";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import InstagramFeed from "@/components/sections/InstagramFeed";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TransformationGallery />
      <ProgramCards />
      <TestimonialCarousel />
      <InstagramFeed />
      <CTASection />
    </>
  );
}