import { RootEntity } from './rootEntity'

export class RootEntityArray<T extends RootEntity> extends Array<T> {
  findById(id: string): T | undefined {
    return this.find((entity) => entity instanceof RootEntity && entity.id === id)
  }

  update(data: T): this {
    const index = this.findIndex((entity) => entity.id === data.id)
    if (index > -1) {
      this[index] = data
    } else {
      this.push(data)
    }
    return this
  }
}
