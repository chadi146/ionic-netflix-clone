import { NgFor } from "@angular/common";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChildren,
  inject,
} from "@angular/core";
import { IonRow, IonicModule } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { TitleHeaderComponent } from "src/app/components/title-header.component";
import { ComingSoon, ComingSoonModel } from "src/app/models/coming-soon.model";
import { ComingSoonService } from "src/app/services/coming-soon.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

@Component({
  selector: "app-coming-soon",
  templateUrl: "./coming-soon.page.html",
  styleUrls: ["./coming-soon.page.scss"],
  standalone: true,
  imports: [IonicModule, NgFor, TitleHeaderComponent, SkeletonComponent],
})
export class ComingSoonPage extends TrackByHelper implements OnInit, OnDestroy {
  private comingSoonService = inject(ComingSoonService);

  private ngUnsubscribeSoon: Subject<boolean> = new Subject();
  soon: ComingSoon[] = [];
  @ViewChildren(IonRow, { read: ElementRef }) rows!: QueryList<ElementRef>;
  @ViewChildren("player") videoPlayers!: QueryList<any>;
  currentPlaying: HTMLVideoElement = null as unknown as HTMLVideoElement;
  activeBlock = 0;

  ngOnInit() {
    this.comingSoonService
      .getComingSoonData()
      .pipe(takeUntil(this.ngUnsubscribeSoon), take(1))
      .subscribe({
        next: (res: ComingSoonModel) => {
          this.soon = [...res.comingSoon];
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  ngAfterContentChecked() {
    if (this.rows && this.videoPlayers) {
      this.contentScrolled(null);
    }
  }

  /**
   * This function checks if a video element is in the viewport and starts autoplay if it is.
   *
   * @param {any} ev - The "ev" parameter is an event object that is passed to the "contentScrolled"
   * function. It contains information about the event that triggered the function, such as the type of
   * event and any additional data related to the event. However, it is not used in the function and can
   * be omitted
   *
   * @returns If the currentPlaying video element is in the viewport, the function returns without doing
   * anything.
   */
  contentScrolled(ev: any) {
    if (this.currentPlaying && this.isElementInViewport(this.currentPlaying)) {
      return;
    } else if (
      this.currentPlaying &&
      !this.isElementInViewport(this.currentPlaying)
    ) {
      /* Item is out of view, pause it */
      this.currentPlaying.pause();
      this.currentPlaying = null as unknown as HTMLVideoElement;
    }

    this.videoPlayers.forEach((player, index) => {
      if (this.currentPlaying) {
        /* Skip all further players, we are already playing */
        return;
      }

      /* Check if the element is in our view */
      const nativeElement = player.nativeElement;
      const inView = this.isElementInViewport(nativeElement);

      /* Start autoplay if it's in the view */
      if (inView) {
        this.activeBlock = index;
        this.currentPlaying = nativeElement;
        this.currentPlaying.muted = true;
        this.currentPlaying.play();
        return;
      }
    });
  }

  /* Check if the element is visible in the view */
  isElementInViewport(el: Element) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= -100 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ngOnDestroy(): void {
    this.ngUnsubscribeSoon.next(true);
    this.ngUnsubscribeSoon.complete();
  }
}
