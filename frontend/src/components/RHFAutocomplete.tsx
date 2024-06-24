import { Autocomplete } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"

type Props<T extends FieldValues> = {
  name: Path<T>
}

const RHFAutocomplete = <T extends FieldValues>({name}: Props<T>) => {
  const { control } = useFormContext()

  return (
    <Controller 
      control={control} 
      name={name} 
      render={(params) => <Autocomplete />}
    />
  )
}

export default RHFAutocomplete