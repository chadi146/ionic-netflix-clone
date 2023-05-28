import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { DownloadsService } from "./downloads.service";
import { DownloadsModel } from "../models/downloads.model";


describe("DownloadsService", () => {
  let service: DownloadsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DownloadsService],
    });

    service = TestBed.inject(DownloadsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getDownloadsData", () => {
    it("should return downloads data", () => {
      const mockResponse: DownloadsModel = {
  "downloads": [
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
  ]}
;

      service.getDownloadsData().subscribe((data: DownloadsModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/downloads.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getDownloadsData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/downloads.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
