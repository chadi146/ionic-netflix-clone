import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { AccountModel } from "../models/account.model";

@Injectable({
  providedIn: "root",
})
export class AccountService {
  private httpClient = inject(HttpClient);

  getAccountsData(): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(
      "../../assets/data/account/account.json"
    );
  }
}
