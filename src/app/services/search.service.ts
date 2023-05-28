import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { SearchModel } from "../models/search.model";

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private httpClient = inject(HttpClient);

  getSearchData(): Observable<SearchModel> {
    return this.httpClient.get<SearchModel>("../../assets/data/search.json");
  }
}
