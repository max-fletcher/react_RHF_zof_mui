import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

type Props<T extends FieldValues> = {
  name: Path<T>,
  options?: Option[]
}

const RHFToggleButtonGroup = <T extends FieldValues>({name, options}: Props<T>) => {
  const {control} = useFormContext()

  console.log(name, options);

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field: { value, onChange, ...restField } }) => {
        return <ToggleButtonGroup 
          // NOTE: newValue is an array provided by MUI's ToggleButtonGroup component. Basically, whatever you provide, RHF will take it and set it as the value.
          // The if condition is to make sure that one option is selected always by default(works in conjunction with the condition in value=).
          onChange={(_, newValue) => {
              if(newValue.length){
                onChange(newValue)
                console.log(newValue);
              }
            }
          }
          // NOTE: This is to make sure that one option is selected always by default(works in conjunction with the condition the "if" condition inside onChange=).
          // Also, we use the ""...restField" here that contains some properties such as "disabled" as "onBlur". Currently, they are not defined, but later, we can accept more props in this conponent
          // and/or modify the behaviour for this component if need be i.e onBlue={() => } or disabled={disabled}(provided we accept a disabled prop)
          value={value && value.length ? value : [options?.[0].id]}
          {...restField}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>{option.label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      }}
    >
    </Controller>
  )
}

export default RHFToggleButtonGroup