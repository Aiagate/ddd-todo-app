import { ValueObject } from '@/domains/shared/valueObject'

export class TodoDeadline extends ValueObject<'Deadline', Date | undefined> {
  constructor(value: Date | undefined) {
    super(value)
  }

  get text(): string | undefined {
    return this.value?.toDateString()
  }

  validation(): Array<Error> {
    console.log('validation')
    const errors: Array<Error> = []
    const now = new Date()
    if (this.value == undefined) return errors
    if (this.value < now) errors.push(new Error(''))
    return errors
  }
}
