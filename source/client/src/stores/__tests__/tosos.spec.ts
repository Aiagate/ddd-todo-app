import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTodoStore } from '../todos'

describe('Counter Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  it('fetch', () => {
    const store = useTodoStore()
    expect(store.todos).toHaveLength(0)
    const res = store.fetch()
    expect(store.todos).toHaveLength(1)
  })
})
