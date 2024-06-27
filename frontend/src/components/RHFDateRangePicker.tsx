import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { FormHelperText, Typography  } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { red } from '@mui/material/colors';
import { DateRangePicker } from "@mui/x-date-pickers-pro";

const errorRed = red[700] // For error messages

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string,
}

const RHFDateRangePicker = <T extends FieldValues>({label, name}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(label, name);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field: {value, ...restField}, fieldState: {error} }) => {
        return <>
          <Typography>{label}</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              value={Array.isArray(value) ? value : [null, null]}
              {...restField}
            />
          </LocalizationProvider>
          {error?.message && <FormHelperText sx={{ pl: 1, color: errorRed }}>{error?.message}</FormHelperText>}
        </>
      }}
    />
  )
}

export default RHFDateRangePicker