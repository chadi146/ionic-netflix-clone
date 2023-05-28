import { NgFor } from "@angular/common";
import { Component, OnInit, inject } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { DetailModel } from "src/app/models/detail.model";
import { DetailService } from "src/app/services/detail.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

@Component({
  selector: "app-details",
  templateUrl: "./details.page.html",
  styleUrls: ["./details.page.scss"],
  standalone: true,
  providers: [DetailService],
  imports: [IonicModule, NgFor, SkeletonComponent],
})
export class DetailsPage extends TrackByHelper implements OnInit {
  private detailService = inject(DetailService);

  private ngUnsubscribeDetail: Subject<boolean> = new Subject();

  details: DetailModel = new DetailModel();

  ngOnInit() {
    this.detailService
      .getDetailData()
      .pipe(takeUntil(this.ngUnsubscribeDetail), take(1))
      .subscribe({
        next: (res: DetailModel) => {
          this.details = { ...res };
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }
}
