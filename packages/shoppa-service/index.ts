/*
  - Allow set baseUrl
  - return schema should always be { content: T, error: string, success: boolean } 
*/

import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  ParamsSerializerOptions,
  isAxiosError,
} from "axios";

export type ServiceType = {
  api: AxiosInstance;
  get: ServiceGet;
};

export type ServiceGet = <T>(
  path: string,
  params?: ParamsSerializerOptions,
  options?: any
) => Promise<T>;

export type AnyFunction = (...args: any[]) => any;

export type Params = {
  [key: string]: any | Params;
};

export type ApiResponse<T> = {
  success: boolean;
  content: T;
  message?: string;
  error_code?: string;
};

export type ApiError = {
  code: number;
  message: string;
  raw?: Error | unknown;
};

export class Service implements ServiceType {
  api: AxiosInstance;

  constructor(options: CreateAxiosDefaults) {
    this.api = axios.create({
      withCredentials: true,
      ...options,
    });
  }

  private cleanContent(content: any): any {
    if (Array.isArray(content)) {
      return content.map(this.cleanContent);
    }

    if (Object(content) === content) {
      for (const key in content) {
        if (typeof content[key]?.["$oid"] === "string") {
          content[key] = content[key]["$oid"];
        }

        if (typeof content[key]?.["$date"]?.["$numberLong"] === "string") {
          content[key] = new Date(
            Number(content[key]?.["$date"]?.["$numberLong"])
          ).toJSON();
        }

        content[key] = this.cleanContent(content[key]);
      }
    }

    return content;
  }

  private throwError(
    code: number = 500,
    message: string = "internal_server_error",
    raw?: Error | unknown
  ): ApiError {
    throw new Error(
      JSON.stringify({
        code,
        message,
        raw,
      })
    );
  }

  public async middleware(cb: AnyFunction) {
    try {
      const res = await cb();

      if (res.data.success === false) {
        return this.throwError(400, res.data.error);
      }

      return this.cleanContent(res.data.content);
    } catch (err) {
      if (isAxiosError(err)) {
        return this.throwError(
          err.response?.data?.error_code,
          err.response?.data?.content,
          err
        );
      }

      return this.throwError(500, "internal_server_error", err);
    }
  }

  public async get<T>(
    path: string,
    params: Params = {},
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.get(path, { params, ...options }));
  }

  public async post<T>(path: string, data: any, options = {}): Promise<T> {
    return this.middleware(() => this.api.post(path, data, options));
  }

  public async put<T>(path: string, data: any, options = {}): Promise<T> {
    return this.middleware(() => this.api.put(path, data, options));
  }

  public async patch<T>(path: string, data: any, options = {}): Promise<T> {
    return this.middleware(() => this.api.patch(path, data, options));
  }

  public async delete<T>(
    path: string,
    params: Params = {},
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.delete(path, { params, ...options }));
  }
}