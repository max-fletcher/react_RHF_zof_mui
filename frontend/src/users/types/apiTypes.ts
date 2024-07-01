// NOTE: Defining types for "Users" endpoint

type Create = {
  variant: 'create'
}

type Edit = {
  variant: 'create',
  id: string
}

type Common = {
  email: string,
  name: string,
  states: [],
  gender: string,
  languages: [],
  skills: [],
  registrationDateAndTime: string,
  formerEmploymentPeriod: [],
  salaryRange: [],
  isTeacher: true,
  students: [{
    name: string
  }],
}

export type ApiCreateEdit = Common & (Create | Edit)
export type ApiGet = Common & Edit

