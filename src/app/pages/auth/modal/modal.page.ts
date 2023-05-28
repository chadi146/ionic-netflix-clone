import { NgFor } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { CategoriesModel, CategoryItem } from "src/app/models/categories.model";
import { CategoriesService } from "src/app/services/categories.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.page.html",
  styleUrls: ["./modal.page.scss"],
  standalone: true,
  providers: [CategoriesService],
  imports: [IonicModule, NgFor, SkeletonComponent],
})
export class ModalPage extends TrackByHelper implements OnInit, OnDestroy {
  private categoriesService = inject(CategoriesService);
  private modalCtrl = inject(ModalController);

  private ngUnsubscribeCategories: Subject<boolean> = new Subject();
  categories: CategoryItem[] = [];

  ngOnInit() {
    this.categoriesService
      .getCategoriesData()
      .pipe(takeUntil(this.ngUnsubscribeCategories), take(1))
      .subscribe({
        next: (res: CategoriesModel) => {
          this.categories = [...res.categories];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeCategories.next(true);
    this.ngUnsubscribeCategories.complete();
  }
}
