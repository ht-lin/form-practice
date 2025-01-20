import { Controller, useFormContext, Path, FieldValues } from "react-hook-form";
import { type Option } from "../types/option";
import { Autocomplete, TextField, Box } from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFAutocomplete<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <Autocomplete
          options={options || []}
          value={options?.find((item) => item.id === value)}
          getOptionLabel={(option) =>
            options?.find((item) => item.id === option.id)?.label ?? ""
          }
          isOptionEqualToValue={(option, newValue) => option.id === newValue.id}
          onChange={(_, newValue) => {
            onChange(newValue?.id);
          }}
          renderInput={(params) => {
            return (
              <TextField
                {...params}
                fullWidth
                inputRef={ref}
                error={!!error}
                helperText={error?.message}
                label={label}
              />
            );
          }}
          renderOption={(props, option) => (
            <Box component="li" {...props} key={option.id}>
              {option.label}
            </Box>
          )}
        />
      )}
    />
  );
}
