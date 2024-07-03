import { TransactionTypeEnum } from '../enums/TransactionTypeEnum';
import { Account } from './AccountRequest ';
import { Category } from './Category';

export class InfoTransactionResponse {
  id: number;
  amount: number;
  description?: string;
  purchaseDate: Date;
  source: string; // Origin or Destination
  category: Category;
  transactionType: TransactionTypeEnum;
  account: Account;

  constructor(
    id: number,
    amount: number,
    description: string | undefined,
    purchaseDate: Date,
    source: string,
    category: Category,
    transactionType: TransactionTypeEnum,
    account: Account
  ) {
    this.id = id;
    this.amount = amount;
    this.description = description;
    this.purchaseDate = purchaseDate;
    this.source = source;
    this.category = category;
    this.transactionType = transactionType;
    this.account = account;
  }
}
