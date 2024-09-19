import { TransactionMapper } from '@org/data/firebase/mappers/transaction.mapper';
import { ITransaction, ITransactionRepository } from '@org/domain';

export class TransactionFirebaseRepository implements ITransactionRepository {
  /**
   * Get all transactions
   * @returns A list of transactions
   */
  async getAll(): Promise<ITransaction[]> {
    return Promise.resolve<ITransaction[]>(
      [
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Transaction 1',
          categoryId: '1',
          annotation: 'Annotation 1',
          amount: 100,
        },
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          description: 'Transaction 2',
          categoryId: '2',
          annotation: 'Annotation 2',
          amount: 200,
        },
      ].map(TransactionMapper.toDomain),
    );
  }
}
