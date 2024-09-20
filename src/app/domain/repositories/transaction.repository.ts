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

  /**
   * Create a new transaction
   * @param transaction The transaction to be created
   * @returns The created transaction
   */
  create(transaction: ITransaction): Promise<void>;
}
