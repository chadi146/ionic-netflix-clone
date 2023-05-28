import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { DownloadsPage } from "./downloads.page";

describe("DownloadsPage", () => {
  let component: DownloadsPage;
  let fixture: ComponentFixture<DownloadsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DownloadsPage]
    });
    fixture = TestBed.createComponent(DownloadsPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`downloads has default value`, () => {
    expect(component.downloads).toEqual([]);
  });

  it(`edit has default value`, () => {
    expect(component.edit).toEqual(false);
  });
});
