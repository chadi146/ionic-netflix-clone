import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { SearchService } from "./search.service";
import { SearchModel } from "../models/search.model";


describe("searchService", () => {
  let service: SearchService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchService],
    });

    service = TestBed.inject(SearchService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getSearchData", () => {
    it("should return search data", () => {
      const mockResponse: SearchModel = {
  "searchList": [
    {
      "id": 2,
      "title": "Lupin",
      "img": "./assets/data/series-2.jpg"
    },
    {
      "id": 3,
      "title": "Money Heist",
      "img": "./assets/data/series-3.jpg"
    },
    {
      "id": 4,
      "title": "Modern Family",
      "img": "./assets/data/series-4.png"
    },]}

;

      service.getSearchData().subscribe((data: SearchModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/search.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getSearchData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/search.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
