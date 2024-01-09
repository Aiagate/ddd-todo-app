export abstract class RootEntity {
  private _id: string
  private _version: string

  constructor(params: { id: string; version: string }) {
    this._id = params.id
    this._version = params.version
  }

  abstract create(params: any): this

  get id(): string {
    return this._id
  }

  get version(): string {
    return this._version
  }

  equals(e: RootEntity): boolean {
    return this._id == e.id && this._version == e.version
  }

  abstract validation(): Array<Error>
}
