import Button, { type ButtonProps } from '@mui/material/Button'

export function PrimaryButton(props: ButtonProps) {
  return <Button color="primary" variant="contained" {...props} />
}