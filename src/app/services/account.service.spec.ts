import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";

import { AccountModel } from "../models/account.model";
import { AccountService } from "./account.service";

describe("AccountService", () => {
  let service: AccountService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AccountService],
    });

    service = TestBed.inject(AccountService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getAccountsData", () => {
    it("should return accounts data", () => {
      const mockResponse: AccountModel = {
  profiles: [
    {
      id: 1,
      name: "John Doe",
      img: "john-doe-img.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      img: "jane-smith-img.jpg",
    },
    {
      id: 3,
      name: "Robert Johnson",
      img: "robert-johnson-img.jpg",
    },
  ],
};

      service.getAccountsData().subscribe((data: AccountModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/account/account.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getAccountsData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/account/account.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
