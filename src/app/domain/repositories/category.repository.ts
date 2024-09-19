import { ICategory } from '@org/domain';

/**
 * Interface for the Transaction Repository
 */
export interface ICategoryRepository {
  /**
   * Get all categories
   * @returns A list of categories
   */
  getAll(): Promise<ICategory[]>;
}
