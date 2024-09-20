import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CategoryService } from '@org/presentation';

@Component({
  selector: 'app-category-form',
  standalone: false,
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
  ) {}

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      type: new FormControl(null),
    });
  }

  onSubmit() {
    console.log('Validate form group.', this.formGroup);
    if (this.formGroup.valid) {
      this.categoryService.create(this.formGroup.value);
    }
  }
}
