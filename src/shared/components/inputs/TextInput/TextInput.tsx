import { TextField, type TextFieldProps } from '@mui/material'

export interface TextInputProps extends Omit<TextFieldProps, 'variant'> {
  label: string
  id?: string
}

export function TextInput({ label, id, ...props }: TextInputProps) {
  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      fullWidth
      margin="normal"
      {...props}
    />
  )
}