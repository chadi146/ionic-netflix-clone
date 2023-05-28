import { Component, Input, OnInit, inject } from "@angular/core";
import { IonicModule, ModalController } from "@ionic/angular";
import { SkeletonComponent } from "src/app/components/skeleton.component";

@Component({
  selector: "app-info-modal",
  templateUrl: "./info-modal.page.html",
  styleUrls: ["./info-modal.page.scss"],
  standalone: true,
  imports: [IonicModule, SkeletonComponent],
})
export class InfoModalPage {
  private modalCtrl = inject(ModalController);
  @Input("series") series: any;

  closeDrawer() {
    this.modalCtrl.dismiss();
  }
}
