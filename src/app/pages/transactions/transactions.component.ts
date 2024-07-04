import { Component, OnInit, signal } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { InfoTransactionResponse } from '../../models/InfoTransactionResponse';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormaterService } from '../../services/formater.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from '../../components/dialogs/alert-dialog/alert-dialog.component';
import { MatMenuModule } from '@angular/material/menu';
import { CreateTransactionDialogComponent } from '../../components/dialogs/create-transaction-dialog/create-transaction-dialog.component';
import { TransactionTypeEnum } from '../../enums/TransactionTypeEnum';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    MatExpansionModule,
    MatTooltipModule,
    MatMenuModule,
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss',
})
export class TransactionsComponent implements OnInit {
  transactions: InfoTransactionResponse[] = [];
  readonly panelOpenState = signal(false);

  private readonly todayDate = new Date();
  filterDate: Date = new Date(
    this.todayDate.getFullYear(),
    this.todayDate.getMonth(),
    1
  );

  constructor(
    private transactionService: TransactionService,
    public formaterService: FormaterService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.updateTransactions();
  }

  updateTransactions() {
    this.transactionService
      .getTransactions(
        this.filterDate,
        new Date(
          this.filterDate.getFullYear(),
          this.filterDate.getMonth() + 1,
          1
        )
      )
      .subscribe((result) => {
        this.transactions = result.transactions;
        console.log(result);
      });
  }

  nexMonthFilter() {
    this.filterDate = new Date(
      this.filterDate.getFullYear(),
      this.filterDate.getMonth() + 1,
      1
    );

    this.updateTransactions();
  }

  prevMonthFilter() {
    this.filterDate = new Date(
      this.filterDate.getFullYear(),
      this.filterDate.getMonth() - 1,
      1
    );

    this.updateTransactions();
  }

  openAlertDialog(transaction: InfoTransactionResponse) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Deletar lançamento',
        message: `Você tem certeza que deseja deletar esse lançamento?
                  ${transaction.description}          
        `,
        successMessage: 'Lançamento deletado com sucesso!',
        actionButtonMessage: 'Deletar',
      },
    });
    dialogRef.afterClosed().subscribe((sucess) => {
      if ((sucess as boolean) === true) {
        console.error('ainda nao implementado');
      }
    });
  }

  openIncomeDialog() {
    this.dialog.open(CreateTransactionDialogComponent, {
      data: {
        transactionType: TransactionTypeEnum.INCOME,
      },
    });
  }

  openExpenseDialog() {
    this.dialog.open(CreateTransactionDialogComponent, {
      data: {
        transactionType: TransactionTypeEnum.EXPENSE,
      },
    });
  }

  openCreditExpenseDialog() {
    this.dialog.open(CreateTransactionDialogComponent, {
      data: {
        transactionType: TransactionTypeEnum.CREDITEXPENSE,
      },
    });
  }
}
