import { CategoryEntity, ICategory } from '@org/domain';

export class CategoryMapper {
  static toDomain(data: any): ICategory {
    const entity = CategoryEntity.create({
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      name: data.name,
      description: data.description,
      color: data.color,
      children: data.children,
      parentId: data.parentId,
      type: data.type,
      available: data.available,
    });

    return entity;
  }
}
