import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { red } from '@mui/material/colors';
import { FormControl, FormControlLabel, FormHelperText, Switch } from "@mui/material";

const errorRed = red[700] // For error messages

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string
}

const RHFSwitch = <T extends FieldValues>({label, name}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(label, name);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field, fieldState: { error } }) => {
        return <FormControl error={!!error}>
          <FormControlLabel
            // NOTE: Using "FormControlLabel" to control the Switch.
            control={<Switch {...field} checked={field.value} />}
            label={label}
          />
          {error?.message && <FormHelperText sx={{ pl: 1, color: errorRed }}>{error?.message}</FormHelperText>}
        </FormControl>
      }}
    />
  )
}

export default RHFSwitch