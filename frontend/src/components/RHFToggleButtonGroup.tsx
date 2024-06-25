import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"
import { ToggleButtonGroup } from "@mui/material"

type Props<T extends FieldValues> = {
  name: Path<T>,
  options?: Option[],
  label: string
}

const RHFToggleButtonGroup = <T extends FieldValues>({name, options, label}: Props<T>) => {
  const {control} = useFormContext()

  return (
    <Controller 
      control={control} 
      name={name} 
      render={({ field: { value, onChange, ...restField } }) => {
        return <ToggleButtonGroup onChange={
          (_, newValue) => {
            if(newValue.length){
              onChange(newValue)
            }
          }
        }
      ></ToggleButtonGroup>
      }}
    >

    </Controller>
  )
}

export default RHFToggleButtonGroup