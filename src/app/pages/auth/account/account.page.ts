import { NgFor } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { AccountModel, Profile } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

import packageInfo from "../../../../../package.json";

@Component({
  selector: "app-account",
  templateUrl: "./account.page.html",
  styleUrls: ["./account.page.scss"],
  standalone: true,
  providers: [AccountService],
  imports: [IonicModule, RouterModule, NgFor, SkeletonComponent],
})
export class AccountPage extends TrackByHelper implements OnInit, OnDestroy {
  private accountService = inject(AccountService);

  private ngUnsubscribeAccount: Subject<boolean> = new Subject();
  appVersion = packageInfo.version;

  accounts: Profile[] = [];

  ngOnInit() {
    this.accountService
      .getAccountsData()
      .pipe(takeUntil(this.ngUnsubscribeAccount), take(1))
      .subscribe({
        next: (res: AccountModel) => {
          this.accounts = [...res.profiles];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeAccount.next(true);
    this.ngUnsubscribeAccount.complete();
  }
}
