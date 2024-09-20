import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ICategory } from '@org/domain';
import { CategoryService, TransactionService } from '@org/presentation';

@Component({
  selector: 'app-transaction-form',
  standalone: false,
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
})
export class TransactionFormComponent implements OnInit {
  public formGroup: FormGroup;
  public categories: ICategory[];

  constructor(
    private formBuilder: FormBuilder,
    private serviceTransaction: TransactionService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.categoryService.getAll().then((categories) => {
      this.categories = categories;
    });

    this.formGroup = this.formBuilder.group({
      amount: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      category: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
      account: new FormControl(null),
      tags: new FormControl(null),
      notes: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.serviceTransaction.create(this.formGroup.value);
    }
  }
}
