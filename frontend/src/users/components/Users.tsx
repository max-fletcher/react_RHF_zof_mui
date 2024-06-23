import { useForm } from "react-hook-form"
import { Autocomplete, Stack, TextField } from "@mui/material"
import { Schema, schema } from "../types/schema"
import { zodResolver } from '@hookform/resolvers/zod'

const Users = () => {
  // NOTE: Mode is one of the many options you can pass to RHF. It dictates when validation will be ran. Some modes are "all": Whenever we type or submit, "onSubmit": on submitting the form,
  // "onBlur": on clicking away from the input.
  const { 
    register, 
    formState: { errors }
  } = useForm<Schema>({
    mode: 'all', resolver: zodResolver(schema)
  })

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
    </Stack>
    </>
  )
}

export default Users