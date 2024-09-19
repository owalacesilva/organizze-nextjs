import { ITransaction } from '@org/domain';

/**
 * Interface for the Transaction Repository
 */
export interface ITransactionRepository {
  /**
   * Get all transactions
   * @returns A list of transactions
   */
  getAll(): Promise<ITransaction[]>;
}
