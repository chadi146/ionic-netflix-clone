import { NgFor } from "@angular/common";
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
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
export class SlideShowPage extends TrackByHelper implements OnInit {
  private renderer = inject(Renderer2);
  @ViewChild("swiperRef") swiperRef: ElementRef | undefined;
  @ViewChild("bg") background!: ElementRef;
  swiperModules = [IonicSlides];

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
    if (Capacitor.isNativePlatform()) {
      StatusBar.setStyle({ style: Style.Dark });
    }
  }

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

  onSlideSnap(ev: any) {
    if (ev.snapIndex == 0) {
      this.flyBgOut();
    } else if (ev.snapIndex == 1) {
      this.flyBgIn();
    }
  }

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

  flyBgOut() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, "reset-bg");
    setTimeout(() => {
      this.renderer.setStyle(element, "webkitTransform", `translateX(0px)`);
      this.renderer.removeClass(element, "reset-bg");
    }, 500);
  }

  flyBgIn() {
    const element = this.background.nativeElement;
    this.renderer.addClass(element, "reset-bg-out");
    setTimeout(() => {
      this.renderer.setStyle(element, "webkitTransform", `translateX(-600px)`);
      this.renderer.removeClass(element, "reset-bg-out");
    }, 500);
  }
}
