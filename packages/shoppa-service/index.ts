import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  ParamsSerializerOptions,
  isAxiosError,
} from "axios";
import { AnyFunction } from "shoppa-ts";

export type ServiceType = {
  get: ServiceGet;
};

export type ServiceGet = <T>(
  path: string,
  params?: ParamsSerializerOptions,
  options?: any
) => Promise<T>;

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
  private api: AxiosInstance;

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
    message: string = "unexpected_error",
    raw?: Error | unknown
  ): ApiError {
    throw {
      code,
      message,
      raw,
    };
  }

  public async middleware(cb: AnyFunction) {
    try {
      const res = await cb();

      if (res.data.success === false) {
        return this.throwError(400, res.data.error);
      }

      return this.cleanContent(res.data.content);
    } catch (error) {
      if (isAxiosError(error)) {
        return this.throwError(
          error.response?.data?.error_code ?? error.response?.status,
          error.response?.data?.message,
          error
        );
      }
      return this.throwError(500, "internal_server_error", error);
    }
  }

  public async get<T = any>(
    path: string,
    params: Params = {},
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.get(path, { params, ...options }));
  }

  public async post<T = any>(
    path: string,
    data: any,
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.post(path, data, options));
  }

  public async put<T = any>(path: string, data: any, options = {}): Promise<T> {
    return this.middleware(() => this.api.put(path, data, options));
  }

  public async patch<T = any>(
    path: string,
    data: any,
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.patch(path, data, options));
  }

  public async delete<T = any>(
    path: string,
    params: Params = {},
    options = {}
  ): Promise<T> {
    return this.middleware(() => this.api.delete(path, { params, ...options }));
  }
}
