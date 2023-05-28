import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SearchPage } from "./search.page";
import {  HttpClientModule } from "@angular/common/http";

describe("SearchPage", () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SearchPage],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [HttpClientModule]
    });
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`searchData has default value`, () => {
    expect(component.searchData).toEqual([]);
  });

  it(`searching has default value`, () => {
    expect(component.searching).toEqual(false);
  });

  describe("ngOnInit", () => {
    it("makes expected calls", () => {
      spyOn(component, "filterResults").and.callThrough();
      component.ngOnInit();
      expect(component.filterResults).toHaveBeenCalled();
    });
  });
});
