import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { FormHelperText  } from "@mui/material"
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { red } from '@mui/material/colors';

const errorRed = red[700] // For error messages

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string,
}

const RHFDateTimePicker = <T extends FieldValues>({label, name}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(label, name);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field, fieldState: {error} }) => {
        return <>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker label={label} {...field} />
          </LocalizationProvider>
          {error?.message && <FormHelperText sx={{ pl: 1, color: errorRed }}>{error?.message}</FormHelperText>}
        </>
      }}
    />
  )
}

export default RHFDateTimePicker