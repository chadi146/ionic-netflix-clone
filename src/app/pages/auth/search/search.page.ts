import { NgClass, NgFor, NgIf } from "@angular/common";
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Capacitor } from "@capacitor/core";
import { Keyboard } from "@capacitor/keyboard";
import { IonicModule } from "@ionic/angular";
import { Subject, take, takeUntil, throwError } from "rxjs";
import { SkeletonComponent } from "src/app/components/skeleton.component";
import { SearchItem, SearchModel } from "src/app/models/search.model";
import { SearchService } from "src/app/services/search.service";
import { TrackByHelper } from "src/app/utils/trackByHelper";

@Component({
  selector: "app-search",
  templateUrl: "./search.page.html",
  styleUrls: ["./search.page.scss"],
  standalone: true,
  providers: [SearchService],
  imports: [IonicModule, NgClass, NgFor, NgIf, FormsModule, SkeletonComponent],
})
export class SearchPage extends TrackByHelper implements OnInit {
  private searchService = inject(SearchService);

  private ngUnsubscribeSearch: Subject<boolean> = new Subject();
  searchData: SearchItem[] = [];
  search = "";
  searching = false;
  @ViewChild("searchInput", { read: ElementRef }) searchInput!: ElementRef;

  ngOnInit() {
    this.searchService
      .getSearchData()
      .pipe(takeUntil(this.ngUnsubscribeSearch), take(1))
      .subscribe({
        next: (res: SearchModel) => {
          this.searchData = [...res.searchList];

          this.filterResults();
        },
        error: (err: Error) => throwError(() => new Error(err.message)),
      });
  }

  blurSearch() {
    if (this.searchInput) {
      this.searchInput.nativeElement.blur();
      this.searching = false;
      if (Capacitor.isNativePlatform()) {
        Keyboard.hide();
      }
    }
  }

  filterResults() {
    const searchValue = this.search.toLowerCase();
    this.searchData = this.searchData.filter(
      (elem: SearchItem) => elem.title.toLowerCase().indexOf(searchValue) >= 0
    );
  }
}
