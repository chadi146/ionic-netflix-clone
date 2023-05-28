import { NgFor } from "@angular/common";
import {
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from "@angular/core";
import { IonItemSliding, IonicModule } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { TitleHeaderComponent } from "src/app/components/title-header.component";
import { Download, DownloadsModel } from "src/app/models/downloads.model";
import { DownloadsService } from "src/app/services/downloads.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

@Component({
  selector: "app-downloads",
  templateUrl: "./downloads.page.html",
  styleUrls: ["./downloads.page.scss"],
  standalone: true,
  imports: [IonicModule, NgFor, TitleHeaderComponent, SkeletonComponent],
})
export class DownloadsPage extends TrackByHelper implements OnInit, OnDestroy {
  private downloadsService = inject(DownloadsService);

  private ngUnsubscribeDownloads: Subject<boolean> = new Subject();
  downloads: Download[] = [];
  @ViewChildren(IonItemSliding) items!: QueryList<IonItemSliding>;
  edit = false;

  ngOnInit() {
    this.downloadsService
      .getDownloadsData()
      .pipe(takeUntil(this.ngUnsubscribeDownloads), take(1))
      .subscribe({
        next: (res: DownloadsModel) => {
          this.downloads = [...res.downloads];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  /* When triggered shows the delete button related to each item or vice-versa */
  toggleRemoveAll() {
    this.edit = !this.edit;

    this.items.forEach((item) => {
      if (this.edit) {
        item.open("end");
      } else {
        item.close();
      }
    });
  }

  removeItem(item: any) {
    this.downloads = this.downloads.filter((elem: any) => elem.id == item.id);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeDownloads.next(true);
    this.ngUnsubscribeDownloads.complete();
  }
}
