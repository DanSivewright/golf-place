"use client"

import { useEffect } from "react"
import Link from "next/link"
import { menuSchema } from "@/schemas/payload"
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion"
import z from "zod"

import { Menu } from "@/types/payload-types"

type Props = {
  nav: Menu["nav"]
}
let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max)

function useBoundedScroll(bounds: number) {
  let { scrollY } = useScroll()
  let scrollYBounded = useMotionValue(0)
  let scrollYBoundedProgress = useTransform(scrollYBounded, [0, bounds], [0, 1])

  useEffect(() => {
    return scrollY.onChange((current) => {
      let previous = scrollY.getPrevious()
      let diff = current - previous
      let newScrollYBounded = scrollYBounded.get() + diff

      scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
    })
  }, [bounds, scrollY, scrollYBounded])

  return { scrollYBounded, scrollYBoundedProgress }
}

export const Header: React.FC<Props> = ({ nav }) => {
  let { scrollYBoundedProgress } = useBoundedScroll(400)
  let scrollYBoundedProgressThrottled = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  )
  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressThrottled, [0, 1], [80, 50]),
        backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
          scrollYBoundedProgressThrottled,
          [0, 1],
          [1, 0.1]
        )})`,
      }}
      className="gutter sticky inset-0 z-50 flex h-20 shadow backdrop-blur-md"
    >
      <div className="mx-auto flex w-full items-center justify-between">
        <motion.a
          href="/"
          style={{
            scale: useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              [1, 0.9]
            ),
          }}
          className="flex origin-left cursor-pointer items-center text-xl font-semibold uppercase"
        >
          <span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
            The
          </span>
          <span className="-ml-1 text-2xl tracking-[-.075em]">GOLF PLACE</span>
        </motion.a>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressThrottled,
              [0, 1],
              [1, 0]
            ),
          }}
          className="flex space-x-4 text-xs font-medium text-slate-400"
        >
          {nav
            ?.filter((x) => x.link.label !== "Home")
            ?.map((routes) => (
              <Link
                // @ts-ignore
                href={routes.link.reference?.value?.slug}
                key={routes.link?.label}
              >
                {routes.link?.label}
              </Link>
            ))}
        </motion.nav>
      </div>
    </motion.header>
  )
}
