import TextField from "@mui/material/TextField";
import { useState, useMemo } from "react";

interface MultilineTextFieldProps {
  maxLength?: number;
  initValue?: string;
}

export const MultilineTextField = ({
  maxLength,
  initValue,
}: MultilineTextFieldProps) => {
  const [text, setText] = useState<string>(initValue ?? "");

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
            maxLength && text.length >= maxLength ? "error.main" : "text.main",
        },
      },
    }),
    [maxLength, text.length >= (maxLength || 0)],
  );

  return (
    <TextField
      label="Описание"
      fullWidth
      multiline
      rows={4}
      value={text}
      onChange={(e) => setText(e.target.value)}
      slotProps={memoSlotProps}
      helperText={maxLength && `${text.length}/${maxLength}`}
      sx={{ boxShadow: 4 }}
    />
  );
};
