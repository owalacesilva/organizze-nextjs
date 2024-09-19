import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import {
  CategoriesComponent,
  CategoryService,
  ContextComponent,
  SidebarComponent,
  TransactionsComponent,
} from '@org/presentation';
import {
  provideRouter,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { routes } from 'src/app/app.routes';
import provideRepositoryProviders from 'src/app/presentation/providers/repositories';

@NgModule({
  declarations: [
    ContextComponent,
    SidebarComponent,
    CategoriesComponent,
    TransactionsComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  providers: [
    provideRouter(routes),
    ...provideRepositoryProviders(),
    CategoryService,
  ],
  bootstrap: [ContextComponent],
})
export class AppModule {}
