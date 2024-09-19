import { ICategory } from '@org/domain';

/**
 * Interface representing a Transaction
 */
export interface ITransaction {
  createdAt: Date;
  updatedAt: Date;
  description: string;
  category: ICategory;
  annotation: string;
  amount: number;
}
