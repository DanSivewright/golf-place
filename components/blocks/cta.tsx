import { Page } from "@/types/payload-types"
import serialize from "@/lib/serialize"
import { cn } from "@/lib/utils"

import { CMSLink } from "../cms-link"
import { Section, sectionVariants } from "../section"

type Props = {
  block: NonNullable<Page["layout"]>[0] & { blockType: "cta" }
}
export const CTA: React.FC<Props> = ({ block }) => {
  return (
    <div
      className={cn(
        sectionVariants({ spacer: "p", size: "sm" }),
        "gutter mx-auto flex max-w-screen-2xl flex-col items-start gap-4 md:flex-row md:items-center md:gap-6 lg:gap-8 xl:gap-10",
        {
          "bg-foreground": block.invertBackground,
          "bg-foreground/10": !block.invertBackground,
        }
      )}
    >
      <article
        className={cn("grow", {
          "text-background": block.invertBackground,
          "text-foreground": !block.invertBackground,
        })}
      >
        {serialize(block.richText as any)}
      </article>
      <div className="flex h-full shrink-0 flex-col gap-4">
        {(block.links || []).map(({ link }, i) => {
          return <CMSLink key={i} link={link} />
        })}
      </div>
    </div>
  )
}
