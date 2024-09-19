import { ICategory, ITransaction, TransactionEntity } from '@org/domain';
import { CategoryEntity } from '@org/domain/entities/category.entity';

export class TransactionMapper {
  static toDomain(data: any): ITransaction {
    const category: ICategory = CategoryEntity.create({
      createdAt: data.category?.createdAt,
      name: data.category?.name,
    });

    const entity: ITransaction = TransactionEntity.create({
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      description: data.description,
      annotation: data.annotation,
      amount: data.amount,
    });

    entity.category = category;

    return entity;
  }
}
