import { Result } from '@/utils/result/result'
import type {
  AxiosInstance,
  AxiosHeaders,
  AxiosResponse,
  AxiosRequestConfig,
  InternalAxiosRequestConfig
} from 'axios'
import axios from 'axios'

export const CreateClient = (url: string = ''): ApiClient => {
  const client = axios.create({
    baseURL: url,
    timeout: 2000
  })
  return new ApiClient(client)
}

export class ApiClient {
  private client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }

  public async get<T = any, R = any>({
    path,
    data,
    headers,
    hookRequest,
    hookResponse
  }: {
    path: string
    data?: any
    headers?: AxiosHeaders
    hookRequest?: (data: any) => InternalAxiosRequestConfig<T>
    hookResponse?: (data: any) => AxiosResponse<R>
  }): Promise<Result<AxiosResponse<R>, Error>> {
    if (hookRequest != undefined) {
      this.client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
        return hookRequest(config)
      })
    }
    if (hookResponse != undefined) {
      this.client.interceptors.response.use((response: AxiosResponse<R>) => {
        return hookResponse(response)
      })
    }
    const config: AxiosRequestConfig = {
      url: path,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      data: data
    }
    return await this.client<R>(config)
      .then((res) => {
        return Result.success(res)
      })
      .catch((errror) => {
        return Result.error(errror)
      })
  }
}
