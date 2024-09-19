import { ICategory, ITransaction, TransactionTypeEnum } from '@org/domain';
import { Entity, EntityId } from '@org/shared';

const MinSize = (value: number, min: number) => value < min;
const MaxSize = (value: number, max: number) => value > max;

type TransactionId = EntityId;

/**
 * Transaction Entity
 */
export class TransactionEntity
  extends Entity<ITransaction>
  implements ITransaction
{
  createdAt: Date;
  updatedAt: Date;
  description: string;
  category: ICategory;
  annotation: string;
  amount: number;

  private constructor(props: Partial<ITransaction>, id?: TransactionId) {
    super(props, id);
  }

  /**
   * Create a new transaction entity
   * @param props Transaction properties
   * @param id Transaction's ID
   * @throws {Error} Invalid amount
   */
  static create(props: Partial<ITransaction>, id?: TransactionId) {
    if (
      !props.amount ||
      MinSize(props.amount, 1) ||
      MaxSize(props.amount, Number.MAX_SAFE_INTEGER)
    ) {
      throw new Error('Invalid amount');
    }

    return new TransactionEntity(props, id);
  }
}
