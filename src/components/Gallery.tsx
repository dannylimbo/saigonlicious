import { galleryImages } from "@/lib/site-data";
import { SectionHeading } from "@/components/ui/BrushLabel";
import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { Reveal } from "@/components/ui/Reveal";

const objectPositions: Record<number, string> = {
  0: "center center",
  1: "center center",
  2: "center 25%",
  3: "center center",
  4: "center center",
  5: "center center",
  6: "center center",
};

export function Gallery() {
  return (
    <section
      className="section-padding overflow-hidden bg-charcoal-light"
      aria-labelledby="gallery-heading"
    >
      <div className="container-narrow">
        <Reveal>
          <SectionHeading
            id="gallery-heading"
            accent
            title="Ein Blick auf unsere Küche"
            subtitle="Frische Bowls, Currys, Nudeln und Takeaway – appetitlich zubereitet."
            align="center"
          />
        </Reveal>

        <div className="gallery-collage">
          {galleryImages.map((image, index) => (
            <div key={image.src} className={`gallery-item-${image.index}`}>
              <PhotoFrame
                src={image.src}
                alt={image.alt}
                aspect="fill"
                className="absolute inset-0 h-full w-full"
                objectPosition={objectPositions[image.index] ?? "center"}
                sizes={
                  image.index === 0
                    ? "(max-width: 1024px) 100vw, 58vw"
                    : image.index >= 6
                      ? "(max-width: 1024px) 50vw, 42vw"
                      : "(max-width: 1024px) 50vw, 28vw"
                }
                revealDelay={index * 90}
                priority={image.index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
