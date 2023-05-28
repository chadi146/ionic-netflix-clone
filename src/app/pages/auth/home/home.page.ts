import { NgFor, NgIf } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { Animation, IonicModule, ModalController } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { HideHeaderDirective } from "src/app/directives/hide-header.directive";
import { HomeModel, Section, Spotlight } from "src/app/models/home.model";
import { HomeService } from "src/app/services/home.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

import { InfoModalPage } from "../info-modal/info-modal.page";
import { ModalPage } from "../modal/modal.page";

import { modalEnterAnimation, modalLeaveAnimation } from "./modal-animation";

@Component({
  selector: "app-home",
  templateUrl: "./home.page.html",
  styleUrls: ["./home.page.scss"],
  standalone: true,
  providers: [HomeService],
  imports: [
    IonicModule,
    RouterModule,
    NgFor,
    NgIf,
    HideHeaderDirective,
    SkeletonComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage extends TrackByHelper implements OnInit, OnDestroy {
  private homeService = inject(HomeService);
  private modalCtrl = inject(ModalController);

  private ngUnsubscribeHome: Subject<boolean> = new Subject();
  @ViewChildren("swiper") swiperList!: QueryList<ElementRef | undefined>;

  sections: Section[] = [new Section(), new Section(), new Section()];
  spotlight: Spotlight = new Spotlight();

  config = {
    slidesPerView: 2.4,
    spaceBetween: 10,
    freeMode: true,
    observer: true,
    observeParents: true,
  };

  ngOnInit(): void {
    this.homeService
      .getHomeData()
      .pipe(takeUntil(this.ngUnsubscribeHome), take(1))
      .subscribe({
        next: (res: HomeModel) => {
          this.sections = [...res.sections];
          this.spotlight = { ...res.spotlight };
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  async openCategories() {
    const modal = await this.modalCtrl.create({
      component: ModalPage,
      cssClass: "transparent-modal",
      enterAnimation: (baseEl) => modalEnterAnimation(baseEl) as Animation,
      leaveAnimation: (baseEl) => modalLeaveAnimation(baseEl) as Animation,
    });

    await modal.present();
  }

  async openInfo(series: any) {
    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      componentProps: { series },
      breakpoints: [0, 0.4],
      initialBreakpoint: 0.4,
    } as any);

    await modal.present();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeHome.next(true);
    this.ngUnsubscribeHome.complete();
  }
}
