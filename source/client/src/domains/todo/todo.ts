import { TodoTitle } from './todoTitle'
import { TodoDescription } from './todoDescription'
import { TodoStatus, TodoStatusEnum } from './todoStatus'
import { TodoDeadline } from './todoDeadline'
import { RootEntity } from '@/domains/shared/rootEntity'

export class Todo extends RootEntity {
  todoStatus: TodoStatus
  title: TodoTitle
  description: TodoDescription
  deadline: TodoDeadline

  constructor(params: {
    id: string
    todoStatus: number
    title: string
    description: string
    deadline?: Date
    version: string
  }) {
    super(params)
    this.todoStatus = new TodoStatus(params.todoStatus)
    this.title = new TodoTitle(params.title)
    this.description = new TodoDescription(params.description)
    this.deadline = new TodoDeadline(params.deadline)
  }

  create(params: { title: string; description: string; deadline?: Date }): this {
    this.todoStatus = new TodoStatus(TodoStatusEnum.ToDo)
    this.title = new TodoTitle(params.title)
    this.description = new TodoDescription(params.description)
    this.deadline = new TodoDeadline(params.deadline)
    return this
  }

  get isDeadlinePassed(): boolean {
    return this.deadline.value !== undefined ? this.deadline.value > new Date() : false
  }

  set done(value: boolean) {
    if (value) {
      this.todoStatus = new TodoStatus(TodoStatusEnum.Done)
    } else {
      this.todoStatus = new TodoStatus(TodoStatusEnum.ToDo)
    }
  }

  get done(): boolean {
    return this.todoStatus.isDone
  }

  public validation(): Array<Error> {
    return new Array<Error>()
  }
}
