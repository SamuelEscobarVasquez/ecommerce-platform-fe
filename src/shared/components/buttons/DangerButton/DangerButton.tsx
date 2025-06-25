import Button, { type ButtonProps } from '@mui/material/Button'

export function DangerButton(props: ButtonProps) {
  return <Button color="error" variant="contained" {...props} />
}