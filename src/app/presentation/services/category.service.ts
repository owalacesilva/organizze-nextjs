import { Inject, Injectable } from '@angular/core';
import { ICategoryRepository } from '@org/domain';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    @Inject('TRANSACTION_REPOSITORY')
    private repository: ICategoryRepository,
  ) {}

  async getAll() {
    return this.repository.getAll();
  }
}
