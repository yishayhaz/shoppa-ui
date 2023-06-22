import { useState } from "react";
import { GenericFunction } from "shoppa-ts";

export type UseApiFunction<T, K extends any[]> = GenericFunction<K, Promise<T>>;

export type UseApiResult<T, K extends any[]> = {
  data: UseApiData<T>;
  isLoading: UseApiIsLoading;
  error: UseApiError;
  fire: UseApiFire<K>;
};

export type UseApiData<T> = T | null;
export type UseApiIsLoading = boolean;
export type UseApiError = ApiError | null;
export type UseApiFire<K extends any[]> = GenericFunction<K, void>;

// copied from packages\shoppa-service\index.ts:
export type ApiError = {
  code: number;
  message: string;
  raw?: Error | unknown;
};

export type UseApiOptions<T, K extends any[]> = {
  onSuccess?: (data: T, args: K) => void;
  onError?: (error: ApiError, args: K) => void;
};

export const useApi = <T, K extends any[]>(
  func: UseApiFunction<T, K>,
  options?: UseApiOptions<T, K>
): UseApiResult<T, K> => {
  const [data, setData] = useState<UseApiData<T>>(null);

  const [isLoading, setIsLoading] = useState<UseApiIsLoading>(false);
  const [error, setError] = useState<UseApiError>(null);

  const fire: UseApiFire<K> = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await func(...args);
      options?.onSuccess?.(result, args);
      setData(result);
    } catch (error) {
      let errorDoc = {} as ApiError;
      if (
        error !== null &&
        typeof error === "object" &&
        "code" in error &&
        "message" in error &&
        "raw" in error &&
        Object.keys(error).length === 3
      ) {
        errorDoc = error as ApiError;
      } else {
        errorDoc = { code: 500, message: "unexpected_error", raw: error };
      }
      options?.onError?.(errorDoc, args);
      setError(errorDoc);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    fire,
  };
};
