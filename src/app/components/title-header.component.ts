import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { IonicModule } from "@ionic/angular";

import { SkeletonComponent } from "./skeleton.component";

@Component({
  selector: "app-title-header",
  template: `<ion-header>
    <ion-toolbar color="dark">
      <ion-title mode="md"
        ><app-skeleton [data]="title"></app-skeleton
      ></ion-title>
      <ion-buttons slot="end">
        <ion-button fill="clear" color="light">
          <ion-icon name="logo-rss"></ion-icon>
        </ion-button>
        <ion-button fill="clear" routerLink="account">
          <img class="logo" src="./assets/img/account.png" alt="My Profile" />
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>`,
  styles: [
    `
      :host {
        ion-header {
          ion-toolbar {
            ion-title {
              font-family: NetflixSansBold;
              font-size: x-large;
            }
            ion-button {
              .logo {
                margin-left: 16px;
                width: 20px;
              }
            }
          }
        }
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule, SkeletonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleHeaderComponent {
  titleVal = "";

  @Input() set title(val: string) {
    this.titleVal = val && String(val).trim() !== "" ? val : this.titleVal;
  }

  get title() {
    return this.titleVal;
  }
}
