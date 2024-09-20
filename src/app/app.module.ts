import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  CategoriesComponent,
  CategoryFormComponent,
  CategoryService,
  ContextComponent,
  SidebarComponent,
  TransactionFormComponent,
  TransactionsComponent,
  TransactionService,
} from '@org/presentation';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { routes } from 'src/app/app.routes';
import provideRepositoryProviders from 'src/app/presentation/providers/repositories';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContextComponent,
    SidebarComponent,
    CategoriesComponent,
    TransactionsComponent,
    TransactionFormComponent,
    CategoryFormComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
  ],
  providers: [
    provideRouter(routes),
    ...provideRepositoryProviders(),
    TransactionService,
    CategoryService,
  ],
  bootstrap: [ContextComponent],
})
export class AppModule {}
