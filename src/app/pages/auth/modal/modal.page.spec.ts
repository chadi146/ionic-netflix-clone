import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ModalPage } from "./modal.page";

describe("ModalPage", () => {
  let component: ModalPage;
  let fixture: ComponentFixture<ModalPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ModalPage]
    });
    fixture = TestBed.createComponent(ModalPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`categories has default value`, () => {
    expect(component.categories).toEqual([]);
  });
});
