import { Page } from "@/types/payload-types"
import serialize from "@/lib/serialize"

import { CMSLink } from "../cms-link"
import { Paragraph } from "../paragraph"
import { Section } from "../section"
import { Title } from "../title"
import { Button } from "../ui/button"

type Props = {
  content: NonNullable<Page["hero"]>[0] & { blockType: "short-heading-hero" }
}
export const ShortHeadingHero: React.FC<Props> = ({ content }) => {
  return (
    <Section spacer="p" className="gutter">
      <Title className="w-full text-balance md:w-2/3">{content.title}</Title>

      <div className="text-muted-foreground/70 w-full text-pretty md:w-2/3">
        {serialize(content.body as any)}
      </div>
      <div className="my-4 flex items-center gap-3">
        {content.links?.map((link) => <CMSLink link={link.link} />)}
      </div>
    </Section>
  )
}
