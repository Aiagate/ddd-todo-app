export class Result<T, E extends Error = Error> {
  private readonly _value: T | E
  constructor(value: T | E) {
    this._value = value
  }

  static success<T>(value: T): Result<T, Error> {
    return new Result<T, Error>(value)
  }

  static error<E extends Error>(error: E): Result<any, E> {
    return new Result<any, E>(error)
  }

  get isError(): boolean {
    return this._value instanceof Error
  }

  get isOk(): boolean {
    return !(this._value instanceof Error)
  }

  get result(): T {
    return this._value as T
  }

  get error(): E {
    return this._value as E
  }

  when({ success, failure }: { success: (data: T) => any; failure: (error: E) => any }) {
    if (this._value instanceof Error) {
      return failure(this._value)
    } else {
      return success(this._value)
    }
  }
}
