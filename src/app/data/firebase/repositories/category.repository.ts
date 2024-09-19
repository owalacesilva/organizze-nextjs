import { CategoryMapper } from '@org/data';
import { CategoryTypeEnum, ICategory, ICategoryRepository } from '@org/domain';

export class CategoryFirebaseRepository implements ICategoryRepository {
  /**
   * Get all categories
   * @returns A list of categories
   */
  async getAll(): Promise<ICategory[]> {
    return Promise.resolve<ICategory[]>(
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Alimentação',
          description: 'Gastos com alimentação',
          color: 'red',
          children: [],
          parentId: '',
          type: CategoryTypeEnum.EXPENSES,
          available: true,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          name: 'Salário',
          description: 'Ganhos com salário',
          color: 'green',
          children: [],
          parentId: '',
          type: CategoryTypeEnum.EARNINGS,
          available: true,
        },
      ].map(CategoryMapper.toDomain),
    );
  }
}
