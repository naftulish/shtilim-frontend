import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

function Alert(props: AlertProps): JSX.Element {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface SnackbarMessageProps {
  open: boolean;
  message: string;
  onClose: () => void;
  severity?: 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
}

const SnackbarMessage: React.FC<SnackbarMessageProps> = ({
  open,
  message,
  onClose,
  severity = 'success',
  autoHideDuration = 3000,
}) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarMessage;
