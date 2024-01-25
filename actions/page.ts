import { collectionSchema, pageSchema } from "@/schemas/payload"
import qs from "qs"
import * as z from "zod"

import { Collection, Page } from "@/types/payload-types"
import { handler, HTTPError, safeFetch } from "@/lib/safe-fetch"

export const page = handler({
  schema: z.object({}),
  cb: async ({ where }) => {
    const query = qs.stringify({ where }, { addQueryPrefix: true })
    try {
      const request = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/pages${query}`,
        {
          method: "GET",
          credentials: "include",
          next: {
            tags: ["page"],
          },
        }
      )
      const json = (await request.json()) as Collection & { docs: Page[] }
      return json
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error("HTTP Error:", error.status, error.message)
      } else {
        throw new Error("Failed to fetch data")
      }
    }
  },
})
