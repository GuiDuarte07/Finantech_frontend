import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Account } from '../models/AccountRequest ';
import { BalanceStatement } from '../models/BalanceStatement';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private hostAddress = 'http://localhost:5037/api/Account';

  constructor(private httpClient: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(this.hostAddress).pipe(
      map((data) =>
        data.map(
          (item) =>
            new Account({
              id: item.id,
              balance: item.balance,
              description: item.description,
              bank: item.bank,
              accountType: item.accountType,
              color: item.color,
            })
        )
      )
    );
  }

  createAccount(account: Account): Observable<Account> {
    const suffix = 'CreateAccount';
    return this.httpClient.post<Account>(
      `${this.hostAddress}/${suffix}`,
      account
    );
  }

  getBalance(): Observable<BalanceStatement> {
    const suffix = 'GetBalanceStatementAsync';
    return this.httpClient.get<BalanceStatement>(
      `${this.hostAddress}/${suffix}`
    );
  }
}
