import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { DownloadsModel } from "../models/downloads.model";

@Injectable({
  providedIn: "root",
})
export class DownloadsService {
  private httpClient = inject(HttpClient);

  getDownloadsData(): Observable<DownloadsModel> {
    return this.httpClient.get<DownloadsModel>(
      "../../assets/data/downloads.json"
    );
  }
}
