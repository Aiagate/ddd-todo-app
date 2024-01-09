import { ValueObject } from '@/domains/shared/valueObject'

export enum TodoStatusEnum {
  Undefined = 0,
  ToDo = 1,
  Done = 2
}

export class TodoStatus extends ValueObject<'TodoStatus', TodoStatusEnum> {
  constructor(value: number) {
    super(value)
  }

  get text(): string {
    return TodoStatusEnum[this.value]
  }

  get isDone(): boolean {
    return this.value == TodoStatusEnum.Done
  }

  validation(): Array<Error> {
    const errors: Array<Error> = []
    return errors
  }
}
