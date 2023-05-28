import { NgIf } from "@angular/common";
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from "@angular/core";
import { IonicModule } from "@ionic/angular";

@Component({
  selector: "app-skeleton",
  template: `<ng-container
      *ngIf="data === undefined || data === null; else default"
    >
      <ion-skeleton-text
        [animated]="true"
        style="width: 100%; height: 100%"
      ></ion-skeleton-text>
    </ng-container>
    <ng-template #default> <div [innerHTML]="data"></div></ng-template>`,
  styles: [
    `
      :host {
        display: block;
        position: relative;
      }
    `,
  ],
  standalone: true,
  imports: [IonicModule, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonComponent implements OnInit {
  @HostBinding("class.text-loaded") textLoaded = false;
  dataVal: string | number = "";

  @Input() set data(val: string | number) {
    this.dataVal = val ? val : this.dataVal;

    if (this.dataVal) {
      this.textLoaded = true;
    } else {
      this.textLoaded = false;
    }
  }

  get data(): string | number {
    return this.dataVal;
  }

  constructor() {}

  ngOnInit() {}
}
