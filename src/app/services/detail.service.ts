import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { DetailModel } from "../models/detail.model";

@Injectable({
  providedIn: "root",
})
export class DetailService {
  private httpClient = inject(HttpClient);

  getDetailData(): Observable<DetailModel> {
    return this.httpClient.get<DetailModel>(
      "../../assets/data/detail/detail.json"
    );
  }
}
