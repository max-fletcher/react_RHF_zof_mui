import { useFormContext } from "react-hook-form"
import { Stack, TextField } from "@mui/material"
import { Schema } from "../types/schema"
import RHFAutocomplete from "../../components/RHFAutocomplete"
// import { useEffect } from "react"
import { useGenders, useLanguages, useSkills, useStates } from "../services/queries"
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup"
import RHFRadioGroup from "../../components/RHFRadioGroup"
import RHFCheckbox from "../../components/RHFCheckbox"
import RHFDateTimePicker from "../../components/RHFDateTimePicker"
import RHFDateRangePicker from "../../components/RHFDateRangePicker"

const Users = () => {
  // NOTE: Mode is one of the many options you can pass to RHF. It dictates when validation will be ran. Some modes are "all": Whenever we type or submit, "onSubmit": on submitting the form,
  // "onBlur": on clicking away from the input.

  const statesQuery = useStates() // Get "states" query
  const languagesQuery = useLanguages() // Get "languages" query
  const genderQuery = useGenders() // Get "gender" query
  const skillsQuery = useSkills() // Get "skills" query

  console.log('statesQuery', statesQuery)
  console.log('languagesQuery.data', languagesQuery)
  console.log('genderQuery', genderQuery.data)
  console.log('skillsQuery', skillsQuery.data)

  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>()

  // NOTE: This is how you can monitor the values that are present in hook-form if you are not using devtools
  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   })

  //   return () => subscription.unsubscribe()
  // }, [watch])

  const onSubmit = () => {
    console.log('submit');
  }

  return (
    <>
    <Stack sx={{ gap:2 }}>
      <TextField {...register('name')} label="Name" error={!!errors.name} helperText={errors.name?.message} />
      <TextField {...register('email')} label="Email" error={!!errors.email} helperText={errors.email?.message} />
      {/* NOTE: See MUI docs to see how the Autocomplete component works. Also we can't use the component 1 line below since it cannot bind the selected value to the component. We create a 
          custom component instead with a controller. */}
      {/* <Autocomplete options={[{id: 1, label: 'Texas'}]} renderInput={(params) => <TextField {...params} label="States" /> } /> */}

      {/* NOTE: There are 4 places where you need to add types in order to infer to react that the name props cannot be empty:
        1. "RHFAutocomplete<Schema>" - (see below) to define the generics for the component(inferred from Zod)
        2. "const RHFAutocomplete = <T extends FieldValues>({name}: Props<T>) => {" - inside RHFAutocomplete.tsx component to define the function params and the generic(i.e <T extends FieldValues>) for
            the function. Remember that "Props<T>" is defined above
        3. const methods = useForm<Schema>({ mode: 'all', resolver: zodResolver(schema) }) - in UsersProvider.tsx to define the generics for useForm(inferred from Zod)
        4. const { register, formState: { errors } } = useFormContext<Schema>() - (see above) to define the generics for useForm(inferred from Zod)
       */}
      <RHFAutocomplete<Schema> name="states" options={statesQuery.data} label="States" />
      <RHFToggleButtonGroup<Schema> name="languages" options={languagesQuery.data} />
      <RHFRadioGroup<Schema> name="gender" options={genderQuery.data} label="Select gender" />
      <RHFCheckbox<Schema> name="skills" options={skillsQuery.data} label="Select skills" />
      <RHFDateTimePicker<Schema> name="registrationDateAndTime" label="Registration date & time" />
      <RHFDateRangePicker<Schema> name="formerEmploymentPeriod" label="Former employment period" />
    </Stack>
    </>
  )
}

export default Users