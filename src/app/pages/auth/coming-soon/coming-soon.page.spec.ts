import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ComingSoonPage } from "./coming-soon.page";

describe("ComingSoonPage", () => {
  let component: ComingSoonPage;
  let fixture: ComponentFixture<ComingSoonPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ComingSoonPage]
    });
    fixture = TestBed.createComponent(ComingSoonPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`soon has default value`, () => {
    expect(component.soon).toEqual([]);
  });

  it(`activeBlock has default value`, () => {
    expect(component.activeBlock).toEqual(0);
  });

  describe("ngAfterContentChecked", () => {
    it("makes expected calls", () => {
      spyOn(component, "contentScrolled").and.callThrough();
      component.ngAfterContentChecked();
      expect(component.contentScrolled).toHaveBeenCalled();
    });
  });
});
