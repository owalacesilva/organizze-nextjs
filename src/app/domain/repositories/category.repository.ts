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

  /**
   * Create a category
   * @param category The category to create
   */
  create(category: ICategory): Promise<void>;
}
