import React from 'react';

export const usePromise = <T>() => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  return {
    error,
    isError: !!error,
    setError,
    data,
    isLoading,
    setIsLoading,
    setData: (data: T) => {
      setIsLoading(false);
      setData(data);
    }
  };
};
