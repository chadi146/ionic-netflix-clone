import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { InfoModalPage } from "./info-modal.page";

describe("InfoModalPage", () => {
  let component: InfoModalPage;
  let fixture: ComponentFixture<InfoModalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [InfoModalPage]
    });
    fixture = TestBed.createComponent(InfoModalPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });
});
