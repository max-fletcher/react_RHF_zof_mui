// NOTE: Defining types for "Users" endpoint

type Create = {
  variant: 'create'
}

type Edit = {
  variant: 'edit',
  id: string
}

export type ApiCommon = {
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

export type ApiCreateEdit = ApiCommon & (Create|Edit)
export type ApiCreate = ApiCommon & Create
export type ApiEdit = ApiCommon & Edit
export type ApiGet = ApiCommon & Edit