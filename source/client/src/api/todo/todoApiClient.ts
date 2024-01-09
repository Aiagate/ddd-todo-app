import axios, { type AxiosRequestConfig, type AxiosError, type AxiosResponse } from 'axios'
import type { TodoResult } from './todoResult'
import { CreateClient, type FindResult } from '@/utils/api'
import { Todo } from '@/domains/todo'
import type { Result } from '@/utils/result/result'

const url = 'http://localhost:4010/todos'
const client = CreateClient(url)

export class TodoApiClient {
  constructor() {}

  async get(id: string): Promise<Result<AxiosResponse<TodoResult, any>, Error>> {
    console.log('get')
    const result = await client.get<any, TodoResult>({
      path: `/${id}`,
      hookResponse: (res: AxiosResponse<TodoResult, any>): AxiosResponse<TodoResult, any> => {
        return res
      }
    })
    return result
  }

  async find(params: URLSearchParams = new URLSearchParams()): Promise<FindResult<Todo>> {
    console.log('find')
    const options: AxiosRequestConfig = {
      url: `${url}`,
      method: 'GET',
      params: params
    }
    return await axios<FindResult<TodoResult>>(options)
      .then((res) => {
        const { data } = res
        const items: Array<Todo> = data.items.map((item) => new Todo(item))
        const result = data as unknown as FindResult<Todo>
        result.items = items
        return result
      })
      .catch((e: AxiosError<{ error: string }>) => {
        throw e
      })
  }
  async update(todo: Todo): Promise<Todo> {
    console.log('update')
    const options: AxiosRequestConfig = {
      url: `${url}`,
      method: 'PUT',
      data: {
        id: todo.id,
        version: todo.version
      }
    }
    return await axios<TodoResult>(options)
      .then((res) => {
        const { data, status } = res
        const item = new Todo(data)
        return item
      })
      .catch((e: AxiosError<{ error: string }>) => {
        throw e
      })
  }
}
