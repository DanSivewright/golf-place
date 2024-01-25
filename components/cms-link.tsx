"use client"

import Link from "next/link"

import { Page } from "@/types/payload-types"
import { cn } from "@/lib/utils"

import { buttonVariants } from "./ui/button"

type Props = {
  link: {
    type?: ("reference" | "custom") | null
    newTab?: boolean | null
    size?: ("xs" | "sm" | "default" | "lg" | "xl") | null
    appearance?:
      | ("secondary" | "ghost" | "link" | "destructive" | "default")
      | null

    reference?: {
      relationTo: "pages"
      value: string | Page
    } | null
    url?: string | null
    label: string
  }
  className?: string
}
export const CMSLink: React.FC<Props> = ({ link, className }) => {
  const href =
    link.type === "reference" &&
    typeof link.reference?.value === "object" &&
    link.reference.value.slug
      ? `${link.reference?.relationTo !== "pages" ? `/${link.reference?.relationTo}` : ""}/${
          link.reference.value.slug
        }`
      : link.url
  console.log("link::: ", link)
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        buttonVariants({
          variant: link.appearance,
          size: link.size ?? "default",
        }),
        className
      )}
    >
      {link.label}
    </Link>
  )
}
