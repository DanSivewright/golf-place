import { page } from "@/actions/page"

import { Blocks } from "@/components/blocks"
import { Hero } from "@/components/hero"

type Props = {
  params: {
    routes: string[]
  }
}
const Page: React.FC<Props> = async ({ params: { routes } }) => {
  const pageQuery = await page({
    where: {
      slug: {
        equals: routes?.[0] ?? "home",
      },
    },
  })
  // there should only be one
  const heros = pageQuery?.docs?.[0]?.hero
  const blocks = pageQuery?.docs?.[0]?.layout
  return (
    <>
      {heros?.map((hero) => <Hero key={hero.id} content={hero} />)}
      <Blocks blocks={blocks ?? []} />
    </>
  )
}
export default Page
