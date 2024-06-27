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
  registrationDateAndTime: z.date(),
  formerEmploymentPeriod: z.array(z.date({message: 'Employment period must be dates'}), {message: 'Employment period must be an array'})
                            .min(2, {message: 'Start or end of employment period is missing'})
                            .max(2, {message: 'Start or end of employment period is missing'}),
  salaryRange: z.array(z.number({message: 'Employment period must be numbers'}), {message: 'Employment period must be an array'})
                  .min(2, {message: 'Start ir en of salary range is missing'})
                  .max(2, {message: 'Start ir en of salary range is missing'}),
  isTeacher: z.boolean(),
  
})

export type Schema = z.infer<typeof schema>

export const defaultValues:Schema = {
  email: '',
  name: '',
  states: [],
  languages: [],
  gender: '',
  skills: [],
  registrationDateAndTime: new Date(),
  formerEmploymentPeriod: [new Date(), new Date()],
  salaryRange:[0, 5000],
  isTeacher: true,
}