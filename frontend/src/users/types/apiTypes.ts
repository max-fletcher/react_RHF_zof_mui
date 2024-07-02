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
  states: [],
  languages: [],
  gender: string,
  skills: [],
  registrationDateAndTime: string,
  formerEmploymentPeriod: [] | [Date, Date],
  salaryRange: [] | [number, number],
  isTeacher: true,
  students: [{
    name: string
  }],
}

export type ApiCreateEdit = Common & (Create | Edit)
export type ApiGet = Common & Edit