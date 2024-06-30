import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"
import { FormControl, FormControlLabel, FormGroup, FormLabel, Checkbox, FormHelperText } from "@mui/material"
import { red } from '@mui/material/colors';

const errorRed = red[700] // For error messages

type Props<T extends FieldValues> = {
  name: Path<T>,
  options?: Option[],
  label: string
}

const RHFCheckbox = <T extends FieldValues>({name, options, label}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(name, options);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field: {value, onChange}, fieldState: { error } }) => {
        // console.log("RHFCheckbox value", value)
        // NOTE: Using "FormControl" since "FromGroup" itself doesn't have an error state or a label either. Also, its worth mentioning that we could've placed the "{...field}" props
        // in "FromGroup" tag instead of in "FormControl" tag. This is because placing anything that isn't one of FormControl's props will be forwarded to the component that is being controlled
        // i.e in this case, "FormGroup", and it is "FormGroup" that is supposed to contain props such as "onChange", "onBlur", "disabled" etc. in the first place.
        return <FormControl error={!!error}>
          <FormLabel>{label}</FormLabel>
          <FormGroup>
            {options?.map((option) => {
              // console.log('In RHFCheckbox Form Group', value, option);
              return <FormControlLabel
                label={option.label} 
                key={option.id} 
                control={
                  <Checkbox 
                    value={value.includes(option.id)} 
                    onChange={() => {
                      if(value.includes(option.id))
                        // NOTE: The " as string[]" is to cast the elements of the "value" array to strings
                        onChange((value as string[]).filter((item: string) => {
                          return item !== option.id
                        }))
                      else
                        onChange([...value, option.id])
                    }}
                    key={option.id}
                  />
                } 
              /> 
            })}
          </FormGroup>
          {error?.message && <FormHelperText sx={{ pl: 1, color: errorRed }}>{error?.message}</FormHelperText>}
        </FormControl>
      }}
    />
  )
}

export default RHFCheckbox