import axios, {
  AxiosInstance,
  CreateAxiosDefaults,
  ParamsSerializerOptions,
} from "axios";

export type ServiceType = {
  api: AxiosInstance;
  middlewares: AnyFunction[];
  get: ServiceGet;
};

export type ServiceGet = <T>(
  path: string,
  params?: ParamsSerializerOptions,
  options?: any
) => Promise<T>;

export type AnyFunction = (...args: any[]) => any;

export class Service implements ServiceType {
  api: AxiosInstance;
  middlewares: AnyFunction[] = [];

  constructor(options: CreateAxiosDefaults, middlewares?: AnyFunction[]) {
    this.api = axios.create({
      withCredentials: true,
      ...options,
    });
    this.middlewares = middlewares ?? [];
  }

  private throwError(code?: number, message?: string): Error {
    throw new Error(
      JSON.stringify({
        code,
        message,
      })
    );
  }

  public async middleware(cb: AnyFunction, middlewares: AnyFunction[]) {
    let res = await cb();

    middlewares.forEach((middleware) => {
      res = middleware(res);
    });

    return res;
  }

  public async get<T>(
    path: string,
    params: ParamsSerializerOptions = {},
    options = {}
  ): Promise<T> {
    return this.middleware(
      () => this.api.get(path, { params, ...options }),
      this.middlewares
    );
  }

  public async post<T>(path: string, data: any, options = {}): Promise<T> {
    return this.middleware(
      () => this.api.post(path, data, options),
      this.middlewares
    );
  }

  public async put<T>(
    path: string,
    data: any = null,
    options = {}
  ): Promise<T> {
    return this.middleware(
      () => this.api.put(path, data || null, options),
      this.middlewares
    );
  }

  public async patch<T>(
    path: string,
    data: any = null,
    options = {}
  ): Promise<T> {
    return this.middleware(
      () => this.api.patch(path, data || null, options),
      this.middlewares
    );
  }

  public async delete<T>(
    path: string,
    params: ParamsSerializerOptions = {},
    options = {}
  ): Promise<T> {
    return this.middleware(
      () => this.api.delete(path, { params, ...options }),
      this.middlewares
    );
  }
}
