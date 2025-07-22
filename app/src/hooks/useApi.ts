import { useState, useEffect, useCallback } from 'react';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  refetch: () => Promise<void>;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const data = await apiCall();
      setState({ data, loading: false, error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      });
    }
  }, [apiCall]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return {
    ...state,
    refetch: fetchData,
  };
}

interface UseAsyncActionReturn<T extends any[], R> {
  execute: (...args: T) => Promise<R>;
  loading: boolean;
  error: string | null;
  reset: () => void;
}

export function useAsyncAction<T extends any[], R>(
  action: (...args: T) => Promise<R>
): UseAsyncActionReturn<T, R> {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (...args: T): Promise<R> => {
    setLoading(true);
    setError(null);

    try {
      const result = await action(...args);
      setLoading(false);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, [action]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return { 
    execute, 
    loading, 
    error, 
    reset 
  };
}