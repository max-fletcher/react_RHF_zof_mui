import { Autocomplete, TextField } from "@mui/material"
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form"
import { Option } from "../types/option"

type Props<T extends FieldValues> = {
  name: Path<T>,
  options: Option[],
  label: string
}

const RHFAutocomplete = <T extends FieldValues>({name, options, label}: Props<T>) => {
  const { control } = useFormContext()

  return (
    <Controller 
      control={control} 
      name={name} 
      // NOTE: Destructuring and retrieving value, onChange and ref from hook-form render function
      // render={({field: {value, onChange, ref}}) => (
        render={({ field: { value = [], onChange, ref }, fieldState: {error} }) => {
          console.log('Inside render', {value})
          return <Autocomplete
            options={options}
            multiple
            disableCloseOnSelect
            // NOTE: Loop and find which option id match the selected value, and return the ids as array i.e converts options to array of ids like this:
            // ["1", "2"] -> [{id: "1", label: "California"}, {id: "2", label: "Texas"}]
            // This dictates the logic by which selected options are populated inside the box(i.e what is shown in the box). If we return true, it will populate the list with the same
            // option multiple times i.e the first option multiple times even if you select other options
            value={value.map((id: string) => options.find((item) => {
              console.log('inside value', item);
              return item.id === id
            }))}
            // NOTE: return the label of the selected option if it exists, else, return an empty string
            getOptionLabel={(option) => options.find((item) => item.id === option.id)?.label ?? ''}
            // NOTE: This contains logic for highlighting which options are selected. Right now, it will only highlight the ones that are selected. If say, you returned true here, all options in the dropdown list
            // would be shown to be selected
            isOptionEqualToValue={(option, newValue) => { return option.id === newValue.id} }
            // NOTE: Loop array of objects, and returns a corresponding array of ids
            // i.e [{id: "1", label: "California"}, {id: "2", label: "Texas"}] -> ["1", "2"]
            onChange={(_, newValue) => {
              console.log('inside onChange', newValue)
              onChange(newValue.map((item) => {
                console.log('inside onChange onChange', item)
                return item.id
              } ))
            }}
            renderInput={(params) => <TextField {...params} fullWidth inputRef={ref} error={!!error} helperText={error?.message} label={label} />}
          />
        }}
    />
  )
}

export default RHFAutocomplete