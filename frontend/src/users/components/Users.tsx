import { useForm } from "react-hook-form"
import { Stack, TextField } from "@mui/material"
import { Schema, schema } from "../types/schema"
import { zodResolver } from '@hookform/resolvers/zod'

const Users = () => {
  // NOTE: Mode is one of the many options you can pass to RHF. It dictates when validation will be ran. Some modes are "all": Whenever we type or submit, "onSubmit": on submitting the form,
  // "onBlur": on clicking away from the input.
  const { register } = useForm<Schema>({
    mode: 'all', resolver: zodResolver(schema)
  })

  const onSubmit = () => {
    console.log('submit');
  }

  return (
    <>
    <Stack sx={{ gap:2 }}>
      <div style={{ display: "flex", flexDirection: "column" }}></div>
      <TextField {...register('name')} label="Name" />
      <TextField {...register('email')} label="Email" />
    </Stack>
    </>
  )
}

export default Users