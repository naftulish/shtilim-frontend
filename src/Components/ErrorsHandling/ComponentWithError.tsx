// ComponentWithError.tsx
import React from 'react';

interface ComponentWithErrorProps {
  message: string;
  onRetry: () => void;
}

const ComponentWithError: React.FC<ComponentWithErrorProps> = ({ message, onRetry }) => {
  return (
    <div>
      <p>{message}</p>
      <button onClick={onRetry}>Try again</button>
    </div>
  );
};

export default ComponentWithError;
