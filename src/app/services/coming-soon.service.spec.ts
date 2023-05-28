import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";


import { ComingSoonService } from "./coming-soon.service";
import { ComingSoonModel } from "../models/coming-soon.model";

describe("ComingSoonService", () => {
  let service: ComingSoonService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ComingSoonService],
    });

    service = TestBed.inject(ComingSoonService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getComingSoonData", () => {
    it("should return soon data", () => {
      const mockResponse: ComingSoonModel = {
  "comingSoon": [
    {
      "id": 0,
      "title": "Seinfeld",
      "desc": "New York comedian Jerry and his friends offer up some hilarious dialogue in this show 'about nothing' that became one of the longest-running sitcoms.",
      "date": "Coming October 1",
      "tags": [
        { "id": 0, "tag": "Sitcom" },
        { "id": 1, "tag": "Comedy" },
        { "id": 2, "tag": "Ensemble" },
        { "id": 3, "tag": "New York City" },
        { "id": 4, "tag": "Critically Acclaimed" }
      ],
      "video": "video.mp4"
    },
  ]
  };

      service.getComingSoonData().subscribe((data: ComingSoonModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/soon/soon.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getComingSoonData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/soon/soon.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
