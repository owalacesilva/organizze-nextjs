import { Inject, Injectable } from '@angular/core';
import { ITransactionRepository } from '@org/domain';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY') private repository: ITransactionRepository
  ) {}

  async getAll() {
    return this.repository.getAll();
  }
}
