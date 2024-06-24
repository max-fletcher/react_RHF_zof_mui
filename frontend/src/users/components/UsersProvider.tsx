import { FormProvider, useForm } from "react-hook-form"
import Users from "./Users"
import { Schema, schema } from "../types/schema"
import { zodResolver } from "@hookform/resolvers/zod"

const UsersProvider = () => {

  const methods = useForm<Schema>({
    mode: 'all', resolver: zodResolver(schema)
  })

  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  )
}

export default UsersProvider