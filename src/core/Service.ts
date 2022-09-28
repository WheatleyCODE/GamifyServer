import { DefaultService } from './DefaultService';
import { MongoService } from './MongoService';

export abstract class Service<T, O> extends MongoService implements DefaultService<T, O> {
  abstract create(o: any): Promise<T>;

  async delete(id: string): Promise<T> {
    try {
      return await this.deleteOneById<T>(id);
    } catch (e) {
      throw e;
    }
  }

  async getAll(pag?: { count: number; offset: number }): Promise<T[]> {
    try {
      return await this.findAll(pag);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, options: O): Promise<T> {
    try {
      return await this.updateOneById(id, options);
    } catch (e) {
      throw e;
    }
  }

  async getOneById(id: string): Promise<T> {
    try {
      return await this.findOneById(id);
    } catch (e) {
      throw e;
    }
  }

  async getAllByIds(ids: string[]): Promise<T[]> {
    try {
      return await this.findAllByIds(ids);
    } catch (e) {
      throw e;
    }
  }

  async getOneBy(options: { [key: string]: any }): Promise<T> {
    try {
      return await this.findOneBy(options);
    } catch (e) {
      throw e;
    }
  }

  async getAllBy(options: { [key: string]: any }): Promise<T[]> {
    try {
      return await this.findAllBy(options);
    } catch (e) {
      throw e;
    }
  }
}
