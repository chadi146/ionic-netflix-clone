import {
  AfterViewInit,
  Directive,
  HostListener,
  Input,
  Renderer2,
  inject,
} from "@angular/core";
import { DomController } from "@ionic/angular";

@Directive({
  selector: "[appHideHeader]",
  standalone: true,
})
export class HideHeaderDirective implements AfterViewInit {
  private renderer = inject(Renderer2);
  private domCtrl = inject(DomController);

  private headerHeight = 80;
  private children!: HTMLCollectionOf<Element>;

  @Input("appHideHeader") header: any;

  ngAfterViewInit(): void {
    this.header = this.header.el as HTMLElement;
    this.children = this.header.children;
  }

  @HostListener("ionScroll", ["$event"]) onContentScroll($event: any) {
    const scrollTop: number = $event.detail.scrollTop;

    /* Ignore if scroll position is negative */
    if (scrollTop < 0) {
      return;
    }

    /* Calculate the new position of the header */
    const newPosition = Math.max(-scrollTop / 2, -this.headerHeight);
    /* Calculate the new opacity for the header's children */
    const newOpacity = 1 - newPosition / -this.headerHeight;

    /* Use the DomController to schedule DOM updates */
    this.domCtrl.write(() => {
      /* Set the new top position of the header */
      this.renderer.setStyle(this.header, "top", `${newPosition}px`);
      for (let i = 0; i < this.children.length; i++) {
        /* Set the new opacity for each child element */
        this.renderer.setStyle(
          this.children[i],
          "opacity",
          newOpacity.toString()
        );
      }
    });
  }
}
