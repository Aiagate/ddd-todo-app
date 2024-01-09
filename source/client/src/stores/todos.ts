import { defineStore } from 'pinia'
import { Todo } from '@/domains/todo'
import { RootEntityArray } from '@/domains/shared/rootEntity'
import { TodoApiClient } from '@/api/todo'

const apiClient = new TodoApiClient()

export const useTodoStore = defineStore('todo', {
  state: () => {
    return {
      todos: new RootEntityArray<Todo>(),
      loading: false
    }
  },
  getters: {
    findById(state) {
      return (id: string): Todo => {
        const todo = state.todos.findById(id)
        if (todo === undefined) throw new Error('todo not found')
        return todo
      }
    }
  },
  actions: {
    async get(id: string) {
      const res = await apiClient.get(id)
      if (res.isOk) {
        this.todos.update(new Todo(res.result.data))
      }
      return
    },
    async update(id: string) {
      const targetData = this.todos.findById(id)
      if (!targetData) {
        return
      }
      const res = await apiClient.update(targetData)
      this.todos.update(res)
      return
    },
    async fetch() {
      this.todos.length = 0
      const res = await apiClient.find()

      res.items.forEach((item) => {
        this.todos.push(item)
      })
      this.loading = false
    },
    async fetchTodo(id: string) {
      fetch(`http://localhost:4010/todos/${id}`, {
        method: 'GET'
      })
        .catch((e) => {
          throw Error(e)
        })
        .then((response) => {
          return response.json() as Promise<Todo>
        })
        .then((res) => {
          this.todos.push(res)
        })
    },
    print() {
      this.todos.forEach((element: Todo) => {
        console.dir(element)
      })
    },
    forceLoading() {
      this.loading = true
    }
  }
})
