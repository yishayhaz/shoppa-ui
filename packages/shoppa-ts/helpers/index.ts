export type GenericFunction<Args extends any[], Res> = (...args: Args) => Res;

export type AnyFunction = GenericFunction<any[], any>;

export type AnyObject = {
  [key: string | number]: any | AnyObject;
};
