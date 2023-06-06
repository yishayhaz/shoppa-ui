import { useState } from "react";
import { GenericFunction } from "shoppa-ts";

export type UseApiProps<T, K extends any[]> = [UseApiFunction<T, K>];

export type UseApiFunction<T, K extends any[]> = (...args: K) => Promise<T>;

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

export const useApi = <T, K extends any[]>(
  func: UseApiFunction<T, K>
): UseApiResult<T, K> => {
  const [data, setData] = useState<UseApiData<T>>(null);

  const [isLoading, setIsLoading] = useState<UseApiIsLoading>(false);
  const [error, setError] = useState<UseApiError>(null);

  const fire: UseApiFire<K> = async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await func(...args);
      setData(result);
    } catch (error) {
      if (
        error !== null &&
        typeof error === "object" &&
        "code" in error &&
        "message" in error &&
        "raw" in error &&
        Object.keys(error).length === 3
      ) {
        setError(error as ApiError);
      } else {
        setError({ code: 500, message: "unexpected_error", raw: error });
      }
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
