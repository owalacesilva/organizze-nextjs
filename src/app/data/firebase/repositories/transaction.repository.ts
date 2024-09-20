import { TransactionMapper } from '@org/data';
import { ITransaction, ITransactionRepository } from '@org/domain';

const transactions: Array<ITransaction> = new Array();

export class TransactionFirebaseRepository implements ITransactionRepository {
  /**
   * Get all transactions
   * @returns A list of transactions
   */
  async getAll(): Promise<ITransaction[]> {
    return Promise.resolve<ITransaction[]>(
      transactions.map(TransactionMapper.toDomain),
    );
  }

  async create(transaction: ITransaction): Promise<void> {
    transactions.push(transaction);
  }
}
