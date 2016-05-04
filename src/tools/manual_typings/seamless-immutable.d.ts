declare module SeamlessImmutable {
  interface DeepMutate {
    deep: boolean
  }

  interface ImmutableCommonMethods<T>{
    setIn?<U extends T>(keys: Array<string|number>, value: any): T | U;
    merge?<U>(obj: U): T & U;
  }

  interface ImmutableObjectMethods<T> extends ImmutableCommonMethods<T> {
    set?<U extends T>(key: string, value: any): U;
    asMutable?(): T;
    asMutable?(DeepMutate): T;
    without?<U>(key: string): U;
    without?<U>(keys: string[]): U;
    without?<U>(...args: string[]): U;
    without?<U>(keyFunction: (value: any, key: string) => boolean): U;
  }

  interface ImmutableArrayMethods<T> extends ImmutableCommonMethods<T> {
    set?<T>(index: number, value: any): Array<T>;
    asMutable?(): Array<T>;
    asMutable?(DeepMutate): Array<T>;
    asObject?<U>(toKeyValue: (item: T) => Array<Array<any>>): U;
    flatMap?<U>(mapFunction: (item: T) => Array<U>)

  }
}

declare module 'seamless-immutable' {
  type Immutable = {
    <T>(obj: Array<T>, options?: any): Array<T> & SeamlessImmutable.ImmutableArrayMethods<T>;
    <T>(obj: T, options?: any): T & SeamlessImmutable.ImmutableObjectMethods<T>;
    isImmutable(target: any): boolean;
    ImmutableError(message: string): Error;
  }

  var Immutable:Immutable;
  export = Immutable;
}