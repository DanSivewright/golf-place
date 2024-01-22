import { cookies } from "next/headers"
import * as z from "zod"

export async function safeFetch<T>(
  schema: z.Schema<T>,
  input: RequestInfo,
  init?: RequestInit,
  logResponse?: boolean
): Promise<T> {
  const response = await fetch(input, init)

  if (!response.ok) {
    throw newHTTPError("Unsuccessful response", response, init?.method)
  }

  const json = await response.json().catch(() => {
    throw newHTTPError("Not a JSON body", response, init?.method)
  })
  if (logResponse) {
    console.log("response:::", json?.data)
  }

  const result = schema.safeParse(json)
  if (!result.success) {
    throw newHTTPError("Unexpected response schema", response, init?.method)
  }

  return result.data
}

async function newHTTPError(
  reason: string,
  response: Response,
  method?: string
) {
  const text = await response.text().catch(() => null)
  const message = `Error fetching ${method} ${response.url} ${response.status}. ${reason}`
  console.error(`${message}. Response body: ${text}`)
  return new HTTPError(response.status, message)
}

export class HTTPError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
    this.status = status
  }
}

const baseSchema = z.object({
  depth: z.number().optional(),
  where: z
    .record(
      z.object({
        equals: z.string().optional(),
      })
    )
    .optional(),
})

export const handler =
  <T, R>({
    schema,
    cb,
  }: {
    schema: z.Schema<T>
    cb: (input: T & z.infer<typeof baseSchema>) => Promise<R>
  }) =>
  async (input: T & z.infer<typeof baseSchema>): Promise<R> => {
    const mergedSchema = baseSchema.merge(
      schema as unknown as z.ZodObject<
        any,
        any,
        any,
        { [x: string]: any },
        { [x: string]: any }
      >
    )
    const parsedInput = mergedSchema.safeParse(input)
    if (!parsedInput?.success) {
      throw new Error("Invalid input")
    }

    return await cb(parsedInput.data as T & z.infer<typeof baseSchema>)
  }
