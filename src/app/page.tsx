import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { DeliveryInfo } from "@/components/DeliveryInfo";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { LunchSpecial } from "@/components/LunchSpecial";
import { MapSection } from "@/components/MapSection";
import { MenuPreview } from "@/components/MenuPreview";
import { MobileQuickActions } from "@/components/MobileQuickActions";
import { OpeningHours } from "@/components/OpeningHours";
import { QuickActions } from "@/components/QuickActions";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-16 sm:pb-0">
        <Hero />
        <QuickActions />
        <Highlights />
        <MenuPreview />
        <LunchSpecial />
        <DeliveryInfo />
        <About />
        <Gallery />
        <OpeningHours />
        <FAQ />
        <MapSection />
        <ContactCTA />
      </main>
      <Footer />
      <MobileQuickActions />
    </>
  );
}
