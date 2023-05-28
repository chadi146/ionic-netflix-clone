import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { SlideShowPage } from "./slide-show.page";
import { IonicSlides } from "@ionic/angular";

describe("SlideShowPage", () => {
  let component: SlideShowPage;
  let fixture: ComponentFixture<SlideShowPage>;

  beforeEach(async () => {
   TestBed.configureTestingModule({
      imports: [RouterTestingModule, SlideShowPage],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(SlideShowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`swiperModules has default value`, () => {
    expect(component.swiperModules).toEqual([IonicSlides]);
  });

  describe("slideResetTransitionStart", () => {
    it("makes expected calls", () => {
      spyOn(component, "flyBgOut").and.callThrough();
      spyOn(component, "flyBgIn").and.callThrough();
      component.slideResetTransitionStart();
      expect(component.flyBgOut).toHaveBeenCalled();
      expect(component.flyBgIn).toHaveBeenCalled();
    });
  });
});
