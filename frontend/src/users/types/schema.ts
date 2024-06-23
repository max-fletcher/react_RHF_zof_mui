import { z } from "zod"
import { patterns } from "../../constants"

export const schema = z.object({
  name: z.string().min(1, {message: 'Required'}),
  email: z.string().min(1, {message: 'Email is Required'}).refine((text)=> {
    // NOTE: Test email field against a regex that comes from "patterns.ts"
    return patterns.email.test(text)
  }, {message: 'Email is not valid'})
})

export type Schema = z.infer<typeof schema> 