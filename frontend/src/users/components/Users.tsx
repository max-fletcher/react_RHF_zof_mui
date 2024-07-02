import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { Button, Container, List, ListItem, ListItemButton, ListItemText, ListSubheader, Stack } from "@mui/material"
import { Schema, defaultValues } from "../types/schema"
import RHFAutocomplete from "../../components/RHFAutocomplete"
import { useEffect } from "react"
import { useGenders, useLanguages, useSkills, useStates, useUser, useUsers } from "../services/queries"
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup"
import RHFRadioGroup from "../../components/RHFRadioGroup"
import RHFCheckbox from "../../components/RHFCheckbox"
import RHFDateTimePicker from "../../components/RHFDateTimePicker"
import RHFDateRangePicker from "../../components/RHFDateRangePicker"
import RHFSlider from "../../components/RHFSlider"
import RHFSwitch from "../../components/RHFSwitch"
import RHFTextField from "../../components/RHFTextField"
import { Option } from "../../types/option"

const Users = () => {
  // NOTE: Mode is one of the many options you can pass to RHF. It dictates when validation will be ran. Some modes are "all": Whenever we type or submit, "onSubmit": on submitting the form,
  // "onBlur": on clicking away from the input.

  const statesQuery = useStates() // Get "states" query
  const languagesQuery = useLanguages() // Get "languages" query
  const genderQuery = useGenders() // Get "gender" query
  const skillsQuery = useSkills() // Get "skills" query
  const usersQuery = useUsers() // Get "users" query

  console.log('statesQuery', statesQuery)
  console.log('languagesQuery.data', languagesQuery)
  console.log('genderQuery', genderQuery.data)
  console.log('skillsQuery', skillsQuery.data)
  console.log('usersQuery', usersQuery.data)

  const {
    // register,
    // formState: { errors },
    watch,
    control,
    unregister,
    reset,
    setValue
  } = useFormContext<Schema>()

  // NOTE: This is how you can monitor the values that are present in hook-form if you are not using devtools
  useEffect(() => {
    const subscription = watch((value) => {
      console.log(value);
    })

    return () => subscription.unsubscribe()
  }, [watch])

  // NOTE: Using this instead of watch('isTeacher'). Also, can also just use "control" and not "control: control" as option
  const isTeacher = useWatch({ control: control, name: 'isTeacher' })
  const id = useWatch({ control: control, name: 'id' })
  const userQuery = useUser(parseInt(id))
  console.log('userQuery', userQuery);

  const handleUserClick = (id: string) => {
    console.log("Inside handleUserClick", id);
    setValue('id', id) //Setting id for the form used. That way, we can retrieve this id in "const id = useWatch..." and use it in "const userQuery = useUser..." to find a user's data and display it
  }

  useEffect(() => {
    if(userQuery.data){
      reset(userQuery.data)
    }
  }, [reset, userQuery.data]) // remember that all and any function that you call inside useEffect must be part of the dependency array

  // NOTE: This hook is for when we are dynamically adding/manipulate fields to a form in RHF. We can import methods from this hook such as append, fields, insert, move, prepend, remove,
  // swap & update. We are destructuring control above for "useFormContext" and passing it in here inside the argument object along with the name(coming from Zod) of the dynamic
  // fields(in this case, an array of objects called "students")
  const { append, fields, remove, replace } = useFieldArray({
    control: control, // can also just use "control" and not "control: control" as option
    name: 'students'
  })

  useEffect(() => {
    if(!isTeacher){
      replace([]) // this replaces the students array with an emtpty array(i.e empties all values present in students array)
      // NOTE: // if we don't use this, after "replace([])" is ran, we will have something like "students: undefined" inside submitted form values which we don't want
      // It is not needed in this case, but its a best practice whenever we are using and removing/toggling all dynamic dependent fields
      unregister('students')
    }
  }, [isTeacher, replace, unregister]) // remember that all and any function that you call inside useEffect must be part of the dependency array

  const handleReset = () => {
    console.log('Reset Form');
    reset(defaultValues)
  }

  const onSubmit = () => {
    console.log('submit');
  }

  return (
    <>
    {/* NOTE: Container is to add padding to the form on all sides. component="form" means this will be considered as a form HTML element */}
    <Container maxWidth="sm" component="form">
      <Stack sx={{flexDirection: 'row', gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user: Option) => {
            console.log('user dude', user);
            return (
                <ListItem disablePadding key={user.id}>
                  {/* NOTE: "selected" is a property of MUI's ListItemButton that highlights the selected item */}
                  <ListItemButton onClick={() => handleUserClick(user.id)} selected={id === user.id}>
                    <ListItemText primary={user.label} />
                  </ListItemButton>
                </ListItem>
            )
          })}
        </List>

        <Stack sx={{ gap:2 }}>
          {/* NOTE: The good ol' way of using textfields. Below it are the component way oof doing things */}
          {/* <TextField {...register('name')} label="Name" error={!!errors.name} helperText={errors.name?.message} />
          <TextField {...register('email')} label="Email" error={!!errors.email} helperText={errors.email?.message} /> */}
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
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
          <RHFSlider<Schema> name="salaryRange" label="Employee salary range" min={0} max={5000} step={100} />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
          {/* NOTE: If "isTeacher" is true, we append a formField with name=""(empty string) as default value. Also, if we don't say type="button", React will think this is a submit btn */}
          {isTeacher && (
            <Button onClick={() => append({ name: '' })} type="button">Add new student</Button>
          )}
          {/* NOTE: Generating the fields needed here. Also using name={`students.${index}.name`} to generate the correct array index for value submission(this is because RHF doesn't 
              take array as argument. You have to use dot syntax when defining arrays for submission). Also using onClick={() => remove(index)} so RHF removes the field with correct index */}
          {fields.map((field, index) => {
            return(
              <>
                <RHFTextField name={`students.${index}.name`} label="Student's name" key={field.id} />
                <Button color="error" onClick={() => remove(index)} type="button">Remove</Button>
              </>
            )
          })}
          {/* NOTE: For submitting and resetting form */}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button type="submit">Create New User</Button>
            <Button onClick={() => handleReset()} type="button">Reset Form</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
    </>
  )
}

export default Users