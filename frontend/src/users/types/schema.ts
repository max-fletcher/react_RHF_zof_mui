import { z } from "zod"
import { patterns } from "../../constants"

// NOTE: Using intersection and discriminated union to create a complex schema(see: "https://zod.dev/?id=intersections" and "https://zod.dev/?id=discriminated-unions")
// Also, we are using an ".and" operator with a union inside. Though it is not preferred, it is simple enough to use for our case instead of an advanced implementation
export const schema = z.intersection(
  z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().min(1, {message: 'Email is Required'}).refine((text)=> {
      // NOTE: Test email field against a regex that comes from "patterns.ts"
      return patterns.email.test(text)
    }, {message: 'Email is not valid'}),
    states: z.array(z.string()).min(1).max(2),
    languages: z.array(z.string()).min(1).max(3),
    gender: z.string().min(1, {message: 'Gender is required'}),
    skills: z.array(z.string()).max(2, {message: 'Maximum 2 options can be selected'}),
    registrationDateAndTime: z.date(),
    formerEmploymentPeriod: z.array(z.date({message: 'Employment period must be dates'}), {message: 'Employment period must be an array'})
                              .min(2, {message: 'Start or end of employment period is missing'})
                              .max(2, {message: 'Start or end of employment period is missing'}),
    salaryRange: z.array(z.number({message: 'Employment period must be numbers'}), {message: 'Employment period must be an array'})
                    .min(2, {message: 'Start ir en of salary range is missing'})
                    .max(2, {message: 'Start ir en of salary range is missing'}),
    
  }),
  z.discriminatedUnion('variant', [
    z.object({ variant: z.literal('create') }),
    z.object({ variant: z.literal('edit'), id: z.string().min(1) })
  ])
).and(
  z.union([
    z.object({ isTeacher: z.literal(false) }),
    z.object({ isTeacher: z.literal(true), 
      students: z.array(
        z.object({
          name: z.string().min(4)
        })
      )
    })
  ])
)


export type Schema = z.infer<typeof schema>

export const defaultValues:Schema = {
  // NOTE: passing 'create' as default since edit also requires an id
  variant: 'create',
  name: '',
  email: '',
  states: [],
  languages: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange:[0, 5000],
  isTeacher: false,
}