import { CategoryTypeEnum, ICategory } from '@org/domain';
import { Entity, EntityId } from '@org/shared';

export type CategoryId = EntityId;

/**
 * Category Entity
 */
export class CategoryEntity extends Entity<ICategory> implements ICategory {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  color: string;
  children: ICategory[];
  parentId: string;
  type: CategoryTypeEnum;
  available: boolean;

  private constructor(props: Partial<ICategory>, id?: CategoryId) {
    super(props, id);
  }

  /**
   * Create a new category entity
   * @param props Category properties
   * @param id Category's ID
   */
  static create(props: Partial<ICategory>, id?: CategoryId) {
    return new CategoryEntity(props, id);
  }
}
