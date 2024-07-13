import React from "react";
import { TextField, SxProps } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  placeholder?: string;
  required?: boolean;
};

const FInput: React.FC<TInputProps> = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth = true,
  sx,
  placeholder,
  required = false,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={sx}
          placeholder={placeholder}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          required={required}
          error={!!error}
          helperText={error ? error.message : ""}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
    />
  );
};

export default FInput;
