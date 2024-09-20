import { Inject, Injectable } from '@angular/core';
import { ICategory, ICategoryRepository } from '@org/domain';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private repository: ICategoryRepository,
  ) {}

  async getAll() {
    return this.repository.getAll();
  }

  async create(category: ICategory) {
    return this.repository.create(category);
  }
}
