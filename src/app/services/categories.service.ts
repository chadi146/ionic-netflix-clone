import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { CategoriesModel } from "../models/categories.model";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private httpClient = inject(HttpClient);

  getCategoriesData(): Observable<CategoriesModel> {
    return this.httpClient.get<CategoriesModel>(
      "../../assets/data/categories.json"
    );
  }
}
