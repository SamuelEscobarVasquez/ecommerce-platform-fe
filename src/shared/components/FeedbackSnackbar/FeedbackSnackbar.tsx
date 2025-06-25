import { Snackbar, Alert, type AlertColor } from '@mui/material';

export interface FeedbackSnackbarProps {
  open: boolean;
  severity: AlertColor;
  message: string;
  onClose: () => void;
}

export function FeedbackSnackbar({
  open,
  severity,
  message,
  onClose,
}: FeedbackSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
}