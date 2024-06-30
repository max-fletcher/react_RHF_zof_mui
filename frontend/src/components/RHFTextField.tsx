import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { TextField, TextFieldProps } from "@mui/material";

// NOTE: We are defining props using intersection types(i.e '&') and we are adding on a label type using 'TextFieldProps' that comes from RHF
type Props<T extends FieldValues> = {
  name: Path<T>,
} & Pick<TextFieldProps, 'label'>

const RHFTextField = <T extends FieldValues>({name, ...props}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(label, name);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field, fieldState: { error } }) => {
        return <TextField {...field} {...props} error={!!error} helperText={error?.message} />
      }}
    />
  )
}

export default RHFTextField