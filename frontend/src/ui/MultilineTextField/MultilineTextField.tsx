import TextField from "@mui/material/TextField";
import { useMemo } from "react";

interface MultilineTextFieldProps {
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
}

export const MultilineTextField = ({
  maxLength,
  value,
  onChange,
}: MultilineTextFieldProps) => {
  const memoSlotProps = useMemo(
    () => ({
      htmlInput: {
        maxLength: maxLength,
        sx: {
          pb: 2,
        },
      },
      formHelperText: {
        sx: {
          position: "absolute",
          bottom: 0,
          right: 0,
          textAlign: "right",
          color:
            maxLength && value.length >= maxLength ? "error.main" : "text.main",
        },
      },
    }),
    [maxLength, value.length >= (maxLength || 0)],
  );

  return (
    <TextField
      label="Описание"
      fullWidth
      multiline
      rows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      slotProps={memoSlotProps}
      helperText={maxLength && `${value.length}/${maxLength}`}
      sx={{ boxShadow: 4 }}
    />
  );
};
