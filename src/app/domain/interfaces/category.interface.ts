import { CategoryTypeEnum } from '@org/domain';

/**
 * Interface for Category
 *
 * @warning Do not use this interface directly. Use the entity instead.
 * Because this interface does not have any validation.
 * and it is not safe to use. It is only for type-checking.
 */
export interface ICategory {
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  color: string;
  children: ICategory[];
  parentId: string;
  type: CategoryTypeEnum;
  available: boolean;
}
