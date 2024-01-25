import { Page } from "@/types/payload-types"

import { Content } from "./content"
import { CTA } from "./cta"

const blockComponents = {
  cta: CTA,
  content: <div>Content TODO</div>, // Add missing block type
  mediaBlock: <div>Media TODO</div>, // Add missing block type
  archive: <div>Archive TODO</div>, // Add missing block type
}

type Props = {
  spacingOnTop?: boolean
  blocks: Page["layout"]
}
export const Blocks: React.FC<Props> = ({ spacingOnTop = true, blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null
  return (
    <>
      {blocks.map((block, index) => {
        const { blockName, blockType } = block

        // if (!blockName || !blockType || !(blockType in blockComponents))
        //   return null

        switch (blockType) {
          case "cta":
            return <CTA block={block} />

          case "content":
            return <Content block={block} />

          default:
            return <pre>{JSON.stringify(block, null, 3)}</pre>
        }
      })}
    </>
  )
}
