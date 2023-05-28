import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { HomeModel } from "../models/home.model";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  private httpClient = inject(HttpClient);

  getHomeData(): Observable<HomeModel> {
    return this.httpClient.get<HomeModel>("../../assets/data/home.json");
  }
}
