import { NgFor } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { Capacitor } from "@capacitor/core";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IonicModule, IonicSlides, Platform } from "@ionic/angular";
import { TrackByHelper } from "src/app/utils/trackByHelper";
import swiperRef, { Pagination, SwiperOptions } from "swiper";

swiperRef.use([Pagination]);

@Component({
  selector: "app-slide-show",
  templateUrl: "./slide-show.page.html",
  styleUrls: ["./slide-show.page.scss"],
  standalone: true,
  imports: [IonicModule, NgFor, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SlideShowPage extends TrackByHelper implements OnInit, OnDestroy {
  private renderer = inject(Renderer2);
  @ViewChild("swiperRef") swiperRef: ElementRef | undefined;
  @ViewChild("bg") background!: ElementRef;
  swiperModules = [IonicSlides];
  timeOutIDs: any[] = [];

  config: SwiperOptions = {
    pagination: true,
  };

  pages = [
    {
      id: 0,
      title: "Watch on any device",
      text: "Stream on your phone, tablet, laptop, and TV without paying more.",
      img: "./assets/img/intro2.png",
    },
    {
      id: 1,
      title: "3, 2, 1... Download!",
      text: "Always have something to watch offline.",
      img: "./assets/img/intro3.png",
    },
    {
      id: 2,
      title: "No pesky contracts",
      text: "Cancel anytime.",
      img: "./assets/img/intro4.png",
    },
  ];

  ngOnInit(): void {
    /* Enable StatusBar only on native devices */
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
    }
  }

  /**
   * This function handles the movement of slides in a swiper component and updates the background
   * element's position accordingly.
   *
   * @param {any} ev - The parameter `ev` is an event object that contains information about the touch
   * event that triggered the `slidesMoved` function. It likely includes properties such as
   * `touches.startX`, `touches.currentX`, `width`, and `touches.diff`, which are used in the function to
   * calculate the amount of
   *
   * @returns If the activeIndex is 0 and the swipe is in the wrong direction, the function returns
   * without doing anything.
   */
  slidesMoved(ev: any) {
    const activeIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
    if (activeIndex == 0 || activeIndex == 1) {
      /* Filter out swipe in the wrong direction on first slide */
      if (activeIndex == 0 && ev.touches.startX < ev.touches.currentX) {
        return;
      }

      const element = this.background.nativeElement;
      const width = ev.width;
      let transform = ev.touches.diff / 3;

      if (activeIndex == 1) {
        transform = -width / 3 + transform;
      }

      this.renderer.setStyle(
        element,
        "webkitTransform",
        `translateX(${transform}px)`
      );
    }
  }

  /**
   * The function checks the snap index of a slide and triggers either the flyBgOut or flyBgIn function
   * based on the index value.
   *
   * @param {any} ev - The parameter "ev" is an event object that is passed to the onSlideSnap function.
   * It contains information about the slide snap event, such as the snap index (the index of the current
   * slide) and other properties related to the event.
   */
  onSlideSnap(ev: any) {
    if (ev.snapIndex == 0) {
      this.flyBgOut();
    } else if (ev.snapIndex == 1) {
      this.flyBgIn();
    }
  }

  /**
   * The function checks the active index of a swiper element and triggers a background animation based
   * on the index value.
   */
  slideResetTransitionStart() {
    const activeIndex = this.swiperRef?.nativeElement.swiper.activeIndex;

    if (this.swiperRef) {
      if (activeIndex == 0) {
        this.flyBgOut();
      } else if (activeIndex == 1) {
        this.flyBgIn();
      }
    }
  }

  /**
   * The function adds a CSS class to an element, sets a timeout, and then removes the class and applies
   * a style to the element after the timeout has elapsed.
   */
  flyBgOut() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, "reset-bg");
    /* Add setTimeOut Ref */
    this.timeOutIDs.push(
      setTimeout(() => {
        this.renderer.setStyle(element, "webkitTransform", `translateX(0px)`);
        this.renderer.removeClass(element, "reset-bg");
      }, 500)
    );
  }

  /**
   * The function adds a CSS class to an element, sets a timeout, and then applies a style to the element
   * to translate it horizontally.
   */
  flyBgIn() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, "reset-bg-out");
    /* Add setTimeOut Ref */
    this.timeOutIDs.push(
      setTimeout(() => {
        this.renderer.setStyle(
          element,
          "webkitTransform",
          `translateX(-600px)`
        );
        this.renderer.removeClass(element, "reset-bg-out");
      }, 500)
    );
  }

  ngOnDestroy(): void {
    /* Make sure to clear all the setTimeout used */
    this.timeOutIDs.forEach((id) => clearTimeout(id));
  }
}
