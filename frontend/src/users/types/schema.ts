import { z } from "zod"
import { patterns } from "../../constants"

export const schema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  email: z.string().min(1, {message: 'Email is Required'}).refine((text)=> {
    // NOTE: Test email field against a regex that comes from "patterns.ts"
    return patterns.email.test(text)
  }, {message: 'Email is not valid'}),
  states: z.array(z.string()).min(1).max(2),
  languages: z.array(z.string()).min(1).max(3),
  gender: z.string().min(1, {message: 'Gender is required'}),
  skills: z.array(z.string()).max(2, {message: 'Maximum 2 options can be selected'}),
})

export type Schema = z.infer<typeof schema>

export const defaultValues:Schema = {
  email: '',
  name: '',
  states: [],
  languages: [],
  gender: '',
  skills: [],
}