import Image from "next/image";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export type PhotoAspect = "4/3" | "3/2" | "16/9" | "square" | "fill";

const aspectClass: Record<Exclude<PhotoAspect, "fill">, string> = {
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
  "16/9": "aspect-video",
  square: "aspect-square",
};

type PhotoFrameProps = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  /** Fixed ratio (default) or fill parent cell (gallery grid) */
  aspect?: PhotoAspect;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  revealDelay?: number;
};

export function PhotoFrame({
  src,
  alt,
  sizes,
  priority = false,
  aspect = "4/3",
  className,
  imageClassName,
  objectPosition = "center",
  revealDelay = 0,
}: PhotoFrameProps) {
  const isFill = aspect === "fill";

  return (
    <Reveal delay={revealDelay} className={cn("block w-full", isFill && "h-full", className)}>
      <div className={cn("photo-frame w-full", isFill && "h-full")}>
        <div
          className={cn(
            "photo-frame-inner relative w-full overflow-hidden",
            isFill ? "h-full min-h-[140px]" : aspectClass[aspect]
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={cn("object-cover", imageClassName)}
            style={{ objectPosition }}
            sizes={sizes}
          />
        </div>
      </div>
    </Reveal>
  );
}
