import { ComponentFixture, TestBed } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { HideHeaderDirective } from "./hide-header.directive";

@Component({
  template: `
    <div>Without Directive</div>
    <div appHideHeader>Default</div>
  `
})
class TestComponent {}

describe("HideHeaderDirective", () => {
  let fixture: ComponentFixture<TestComponent>;
  let elementsWithDirective: Array<DebugElement>;
  let bareElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HideHeaderDirective, TestComponent]
    });
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    elementsWithDirective = fixture.debugElement.queryAll(
      By.directive(HideHeaderDirective)
    );
    bareElement = fixture.debugElement.query(By.css(":not([appHideHeader])"));
  });

  it("should have bare element", () => {
    expect(bareElement).toBeTruthy();
  });

  it("should have 1 element(s) with directive", () => {
    expect(elementsWithDirective.length).toBe(1);
  });
});
