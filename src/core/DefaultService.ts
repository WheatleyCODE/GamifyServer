export abstract class DefaultService<T, O> {
  abstract create(options: any): Promise<T>;
  abstract delete(id: string): Promise<T>;
  abstract getAll(pag?: { count: number; offset: number }): Promise<T[]>;
  abstract update(id: string, options: O): Promise<T>;
  abstract getOneById(id: string): Promise<T>;
  abstract getAllByIds(ids: string[]): Promise<T[]>;
  abstract getOneBy(options: { [key: string]: any }): Promise<T>;
  abstract getAllBy(options: { [key: string]: any }): Promise<T[]>;
}
