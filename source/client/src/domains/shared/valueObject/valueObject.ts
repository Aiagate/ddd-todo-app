export abstract class ValueObject<T extends string, K> {
  private readonly _value: K

  constructor(value: K) {
    this._value = value
  }

  get value(): K {
    return this._value
  }

  abstract get text(): any

  equals(v: ValueObject<T, K>): boolean {
    return this.value == v.value
  }

  abstract validation(): Array<Error>
}
