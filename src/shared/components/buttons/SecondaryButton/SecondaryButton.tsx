import Button, { type ButtonProps } from '@mui/material/Button'

export function SecondaryButton(props: ButtonProps) {
  return <Button color="secondary" variant="contained" {...props} />
}