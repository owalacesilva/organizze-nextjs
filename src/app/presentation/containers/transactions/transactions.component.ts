import { NgFor } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { ITransaction } from '@org/domain';
import { TransactionService } from '@org/presentation';

@Component({
  selector: 'app-transactions',
  standalone: false,
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  @Output() transactions: ITransaction[];

  constructor(private transactionService: TransactionService) {
    this.transactions = [];
  }

  ngOnInit(): void {
    this.transactionService.getAll().then((transactions) => {
      this.transactions = transactions;
    });
  }
}
