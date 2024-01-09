import { ValueObject } from '@/domains/shared/valueObject'

export class TodoDescription extends ValueObject<'Description', string> {
  constructor(value: string) {
    super(value)
  }

  get text(): string {
    return this.value
  }

  validation(): Array<Error> {
    const errors: Array<Error> = []
    if (this.value.length > 1000) errors.push(new Error(''))
    return errors
  }
}
