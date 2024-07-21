import { Injectable } from '@angular/core';
import { serverConnectionString } from '../config/server';
import { HttpClient } from '@angular/common/http';
import { Createuser } from '../models/CreateUser';
import { InfoUserResponse } from '../models/InfoUserResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private hostAddress = `${serverConnectionString}/User`;

  constructor(private httpClient: HttpClient) {}

  createUser(user: Createuser) {
    const rote = 'CreateUser';
    return this.httpClient.post<InfoUserResponse>(
      `${this.hostAddress}/${rote}`,
      user
    );
  }
}