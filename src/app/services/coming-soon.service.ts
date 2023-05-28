import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";

import { ComingSoonModel } from "../models/coming-soon.model";

@Injectable({
  providedIn: "root",
})
export class ComingSoonService {
  private httpClient = inject(HttpClient);

  getComingSoonData(): Observable<ComingSoonModel> {
    return this.httpClient.get<ComingSoonModel>(
      "../../assets/data/soon/soon.json"
    );
  }
}
