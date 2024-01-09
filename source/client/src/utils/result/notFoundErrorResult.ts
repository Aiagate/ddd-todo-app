import type { AxiosError } from 'axios'
import { Result } from './result'

export class NotFoundError<T, E extends AxiosError> extends Result<T, E> {
  constructor(value: T | E) {
    super(value)
  }
}
