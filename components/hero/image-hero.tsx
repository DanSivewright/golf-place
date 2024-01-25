import Image from "next/image"

import { Media, Page } from "@/types/payload-types"
import serialize from "@/lib/serialize"
import { cn } from "@/lib/utils"

import { CMSLink } from "../cms-link"
import { gridVariants } from "../grid"
import { Section } from "../section"
import { Title } from "../title"

type Props = {
  content: NonNullable<Page["hero"]>[0] & { blockType: "image-hero" }
}
export const ImageHero: React.FC<Props> = ({ content }) => {
  if (content.fullscreen) {
    return (
      <section className={cn([gridVariants({ gap: "none" }), "h-[100dvh]"])}>
        <div
          className={cn(
            "gutter col-span-7 flex h-full flex-col items-start justify-center",
            {
              "order-2": content.position === "left",
            }
          )}
        >
          <Title className="text-balance">{content.title}</Title>

          <div className="text-muted-foreground/70 text-pretty">
            {serialize(content.body as any)}
          </div>
          <div className="my-4 flex items-center gap-3">
            {content.links?.map((link) => <CMSLink link={link.link} />)}
          </div>
        </div>
        {content.image && (
          <div
            className={cn(
              "relative col-span-5 h-full overflow-hidden", //
              {
                "order-1": content.position === "left",
              }
            )}
          >
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_API_URL!.replace(/\/api$/, "")}${(content.image as Media).url}`}
              alt={(content.image as Media).alt}
              className="object-cover"
            />
          </div>
        )}
      </section>
    )
  } else {
    return (
      <Section
        className={cn(
          gridVariants({
            gap: "xl",
          }),
          "gutter mx-auto max-w-screen-2xl"
        )}
      >
        <div
          className={cn(
            "col-span-6 flex h-full flex-col items-start justify-center",
            {
              "order-2": content.position === "left",
              "col-span-12 text-center items-center":
                content.position === "bottom",
            }
          )}
        >
          <Title className="text-balance">{content.title}</Title>

          <div
            className={cn(
              "text-muted-foreground/70 text-pretty", //
              {
                "w-full md:w-2/3": content.position === "bottom",
              }
            )}
          >
            {serialize(content.body as any)}
          </div>
          <div className="my-4 flex items-center gap-3">
            {content.links?.map((link) => <CMSLink link={link.link} />)}
          </div>
        </div>
        {content.image && (
          <div
            className={cn(
              "relative col-span-6 aspect-square w-full overflow-hidden rounded-lg", //
              {
                "order-1": content.position === "left",
                "col-span-12 aspect-video": content.position === "bottom",
              }
            )}
          >
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_API_URL!.replace(/\/api$/, "")}${(content.image as Media).url}`}
              alt={(content.image as Media).alt}
              className="object-cover"
            />
          </div>
        )}
      </Section>
    )
  }
}
