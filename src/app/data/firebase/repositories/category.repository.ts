import { CategoryMapper } from '@org/data';
import { ICategory, ICategoryRepository } from '@org/domain';

const categories: Array<ICategory> = new Array();

export class CategoryFirebaseRepository implements ICategoryRepository {
  /**
   * Get all categories
   * @returns A list of categories
   */
  async getAll(): Promise<ICategory[]> {
    return Promise.resolve<ICategory[]>(
      categories.map(CategoryMapper.toDomain),
    );
  }

  /**
   * Create a category
   * @param category The category to create
   */
  async create(category: ICategory): Promise<void> {
    categories.push(category);
  }
}
