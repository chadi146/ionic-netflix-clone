import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";


import { CategoriesService } from "./categories.service";
import { CategoriesModel } from "../models/categories.model";

describe("categorieservice", () => {
  let service: CategoriesService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriesService],
    });

    service = TestBed.inject(CategoriesService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getCategoriesData", () => {
    it("should return categories data", () => {
      const mockResponse: CategoriesModel = {
  "categories": [
    { "id": 1, "category": "Home" },
    { "id": 2, "category": "My List" },
    { "id": 3, "category": "Available for Download" },
    { "id": 4, "category": "Action" },
    { "id": 5, "category": "Anime" },
    { "id": 6, "category": "Blockbusters" }
  ]
};

      service.getCategoriesData().subscribe((data: CategoriesModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/categories.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getCategoriesData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/categories.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
