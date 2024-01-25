import { Page } from "@/types/payload-types"
import serialize from "@/lib/serialize"
import { cn } from "@/lib/utils"

import { CMSLink } from "../cms-link"
import { Grid, gridVariants } from "../grid"
import { Section, sectionVariants } from "../section"

type Props = {
  block: NonNullable<Page["layout"]>[0] & { blockType: "content" }
}
export const Content: React.FC<Props> = ({ block }) => {
  return (
    <Section
      // spacer="p"
      className={cn("gutter", {
        "bg-foreground text-background": block.invertBackground,
        "bg-background text-foreground": !block.invertBackground,
      })}
    >
      <Grid className="mx-auto max-w-screen-2xl">
        {block.columns?.map((col, index) => (
          <div
            key={col.id}
            className={cn(
              sectionVariants({ size: "sm", className: "text-balance" }),
              {
                "col-span-4": col.size === "oneThird",
                "col-span-8": col.size === "twoThirds",
                "col-span-12": col.size === "full",
                "col-span-6": col.size === "half",
              }
            )}
          >
            {serialize(col.richText as any)}
            {col.enableLink && col.link ? (
              <CMSLink className="mt-4" link={col.link} />
            ) : null}
          </div>
        ))}
      </Grid>
    </Section>
  )
}
