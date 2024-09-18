import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ContextComponent } from '@org/presentation';

@NgModule({
  declarations: [ContextComponent],
  imports: [BrowserModule, CommonModule],
  providers: [],
  bootstrap: [ContextComponent],
})
export class AppModule {}
