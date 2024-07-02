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
  registrationDateAndTime: Date,
  formerEmploymentPeriod: Date[],
  salaryRange: number[],
  isTeacher: boolean,
  students?: {
    name: string
  }[],
  variant:'create'|'edit',
}

export type ApiCreateEdit = Common & (Create|Edit)
export type ApiGet = Common & Edit