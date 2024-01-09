import { ValueObject } from '@/domains/shared/valueObject'

export class TodoTitle extends ValueObject<'Title', string> {
  constructor(value: string) {
    super(value)
  }

  get text(): string {
    return this.value
  }

  validation(): Array<Error> {
    const errors: Array<Error> = []
    if (this.value.length > 100) errors.push(new Error(''))
    return errors
  }
}
