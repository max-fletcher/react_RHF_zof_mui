// NOTE: Defining types for "Users" endpoint

type Create = {
  variant: 'create'
}

type Edit = {
  variant: 'edit',
  id: string
}

type Common = {
  name: string,
  email: string,
  states: string[],
  languages: string[],
  gender: string,
  skills: string[],
  registrationDateAndTime: string | Date,
  formerEmploymentPeriod: string[] | Date[],
  salaryRange: number[],
  isTeacher: boolean,
  students?: {
    name: string
  }[],
  variant:'create'|'edit',
  id?:string
}

export type ApiCreateEdit = Common 
export type ApiGet = Common & Edit