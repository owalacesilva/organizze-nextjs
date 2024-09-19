import { Routes } from '@angular/router';
import {
  CategoriesComponent,
  LoginComponent,
  TransactionsComponent,
} from '@org/presentation';

export const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'transactions', component: TransactionsComponent, pathMatch: 'full' },
  { path: 'categories', component: CategoriesComponent, pathMatch: 'full' },
];
