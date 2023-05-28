import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { AccountPage } from "./account.page";

import packageInfo from "../../../../../package.json";

describe("AccountPage", () => {
  let component: AccountPage;
  let fixture: ComponentFixture<AccountPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AccountPage]
    });
    fixture = TestBed.createComponent(AccountPage);
    component = fixture.componentInstance;
  });

  it("can load instance", () => {
    expect(component).toBeTruthy();
  });

  it(`appVersion has default value`, () => {
    expect(component.appVersion).toEqual(packageInfo.version);
  });

  it(`accounts has default value`, () => {
    expect(component.accounts).toEqual([]);
  });
});
