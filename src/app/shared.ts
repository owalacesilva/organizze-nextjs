/**
 * Domain interface
 */
export interface Domain<T> {
  id: T;
}

/**
 * Mapper interface
 */
export abstract class Mapper {
  /**
   * toDomain method
   */
  abstract toDomain(): any;
}

/**
 * IUseCase interface
 */
export interface IUseCase<T, R> {
  /**
   * Execute method
   *
   * @param T - The input parameter type
   * @param R - The return type
   * @returns The return value
   */
  execute(params: T): R;
}

/**
 * Entity ID type
 * @description Entity can be identified by a string or a number
 */
export type EntityId = string | number;

/**
 * Entity is an abstract class that represents a generic entity.
 * @abstract
 * @generic T - The type of the entity properties
 */
export abstract class Entity<T> {
  private _id: EntityId;

  protected constructor(props: Partial<T>, id?: EntityId) {
    Object.assign(this, { ...props, _id: id });
  }

  /**
   * Get the entity ID
   */
  public get id() {
    return this._id;
  }
}
