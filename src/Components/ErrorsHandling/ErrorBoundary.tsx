// import React, { ErrorInfo } from 'react';
// import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert, { AlertProps } from '@mui/material/Alert';
// import Button from '@mui/material/Button';

// // Custom MuiAlert component to be used inside Snackbar
// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

// // Fallback UI component to display when an error occurs
// function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
//   const [open, setOpen] = React.useState(true);

//   const handleClose = () => {
//     setOpen(false);
//     resetErrorBoundary();
//   };

//   return (
//     <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//       <div> {/* Wrap the content inside a div */}
//         <Alert onClose={handleClose} severity="error">
//           <strong>Something went wrong:</strong>
//           <pre>{error.message}</pre>
//         </Alert>
//         <Button onClick={handleClose} variant="contained" color="primary">
//           Try again
//         </Button>
//       </div>
//     </Snackbar>
//   );
// }

// // Error boundary component
// function ErrorBoundary({ children }: { children: React.ReactNode }) {
//   // Error handler function to log errors to an error reporting service
//   function logErrorToService(error: Error, errorInfo: ErrorInfo) {
//     console.error('Error caught by error boundary:', error, errorInfo);
//     // You can log the error to an error reporting service here
//   }

//   return (
//     <ReactErrorBoundary FallbackComponent={ErrorFallback} onError={logErrorToService}>
//       {children}
//     </ReactErrorBoundary>
//   );
// }

// export default ErrorBoundary;


import React, { Component, ErrorInfo } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// Custom Alert component for Snackbar
function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
  }

  handleClose = () => {
    this.setState({ error: null, errorInfo: null });
  };

  render() {
    const { error, errorInfo } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <Snackbar open={true} autoHideDuration={6000} onClose={this.handleClose}>
          <Alert onClose={this.handleClose} severity="error">
            <strong>Something went wrong:</strong>
            <pre>{error.message}</pre>
          </Alert>
        </Snackbar>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
