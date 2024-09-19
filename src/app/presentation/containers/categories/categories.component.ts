import { NgFor } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ICategory } from '@org/domain';
import { CategoryService } from '@org/presentation';

@Component({
  selector: 'app-categories',
  standalone: false,
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  @Output() categories: ICategory[];

  constructor(private service: CategoryService) {
    this.categories = [];
  }

  ngOnInit(): void {
    this.service.getAll().then((categories) => {
      this.categories = categories;
    });
  }
}
