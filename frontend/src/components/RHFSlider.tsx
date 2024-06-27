import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { FormHelperText, Slider, Typography  } from "@mui/material"
import { red } from '@mui/material/colors';

const errorRed = red[700] // For error messages

type Props<T extends FieldValues> = {
  name: Path<T>,
  label: string,
  min: number,
  max: number,
  step: number
}

const RHFSlider = <T extends FieldValues>({label, name, min, max, step}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(label, name);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field, fieldState: {error} }) => {
        return <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" min={min} max={max} step={step} />
          {error?.message && <FormHelperText sx={{ pl: 1, color: errorRed }}>{error?.message}</FormHelperText>}
        </>
      }}
    />
  )
}

export default RHFSlider