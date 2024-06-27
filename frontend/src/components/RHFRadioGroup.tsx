import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material"

type Props<T extends FieldValues> = {
  name: Path<T>,
  options?: Option[],
  label: string
}

const RHFRadioGroup = <T extends FieldValues>({name, options, label}: Props<T>) => {
  const {control} = useFormContext()

  // console.log(name, options);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field, fieldState: { error } }) => {
        console.log(field.value)
        // NOTE: Using "FormControl" since "RadioGroup" itself doesn't have an error state or a label either. Also, its worth mentioning that we could've placed the "{...field}" props
        // in "RadioGroup" tag instead of in "FormControl" tag. This is because placing anything that isn't one of FormControl's props will be forwarded to the component that is being controlled
        // i.e in this case, "RadioGroup", and it is "RadioGroup" that is supposed to contain props such as "onChange", "onBlur", "disabled" etc. in the first place.
        return <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => {
              console.log('In Radio Group', field.value, option);
              return <FormControlLabel
                value={option.id} 
                control={<Radio checked={field.value === option.id} />} 
                label={option.label} 
                key={option.id} 
              />
            })}
          </RadioGroup>
        </FormControl>
      }}
    />
  )
}

export default RHFRadioGroup