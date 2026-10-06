import { About } from "@/components/About";
import { ContactCTA } from "@/components/ContactCTA";
import { DeliveryInfo } from "@/components/DeliveryInfo";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { MapSection } from "@/components/MapSection";
import { MenuPreview } from "@/components/MenuPreview";
import { MobileQuickActions } from "@/components/MobileQuickActions";
import { OpeningHours } from "@/components/OpeningHours";
import { OrderSection } from "@/components/OrderSection";
import { QuickActions } from "@/components/QuickActions";
import { getPublicMenu, lunchPriceLabel } from "@/lib/menu/public";

export const revalidate = 60;

export default async function Home() {
  const menu = await getPublicMenu();
  const lunchLabel = lunchPriceLabel(menu).replace(/^ab\s+/i, "");

  return (
    <>
      <Header />
      <main className="min-w-0 overflow-x-clip pb-20 sm:pb-0">
        <Hero lunchPriceLabel={lunchLabel} />
        <QuickActions />
        <OrderSection />
        <Highlights lunchPriceLabel={lunchLabel} />
        <MenuPreview menu={menu} />
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
