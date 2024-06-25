import { FormProvider, useForm } from "react-hook-form"
import Users from "./Users"
import { Schema, defaultValues, schema } from "../types/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { DevTool } from "@hookform/devtools"

const UsersProvider = () => {
  // NOTE: It is always a best practice to provide a default value
  const methods = useForm<Schema>({
    mode: 'all', 
    resolver: zodResolver(schema),
    defaultValues: defaultValues
  })

  return (
    <FormProvider {...methods}>
      <Users />
      {/* NOTE: Enabling devtools for hook-form */}
      <DevTool control={methods.control} />
    </FormProvider>
  )
}

export default UsersProvider