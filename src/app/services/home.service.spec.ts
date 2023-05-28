import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import { HomeService } from "./home.service";
import { HomeModel } from "../models/home.model";


describe("homeService", () => {
  let service: HomeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomeService],
    });

    service = TestBed.inject(HomeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getHomeData", () => {
    it("should return home data", () => {
      const mockResponse: HomeModel = {
    "spotlight": {
        "id": 2,
        "name": "Firefly",
        "rating": "#5 in Germany Today",
        "desc": "One found fame and fortune. The other love and family. Lifelong best friends who are as different as can be — and devoted as it gets."
    },
    "sections": [
        {
          "id": 0,
            "title": "Continue Watching for Chadi",
            "type": "continue",
            "series": [
                {
                    "id": 1,
                    "progress": 42,
                    "title": "Bridergton",
                    "season": "S1:E3"
                },
                {
                    "id": 2,
                    "progress": 80,
                    "title": "Lupin",
                    "season": "S1:E5"
                },
                {
                    "id": 3,
                    "progress": 12,
                    "title": "Money Heist",
                    "season": "S3:E4"
                }
            ]
        },
        {
          "id": 1,
          "title": "Netflix Originals",
          "type": "original",
          "series": [
            {
              "id": 1,
              "progress": 42
            },
            {
              "id": 2,
              "progress": 42
            },
            {
              "id": 3,
              "progress": 42
            }
          ]
        },
        {
          "id": 2,
          "title": "Trending Now",
          "type": "series",
          "series": [
            {
              "id": 5,
              "progress": 42
            },
            {
              "id": 6,
              "progress": 42
            },
            {
              "id": 7,
              "progress": 42
            },
            {
              "id": 8,
              "progress": 42
            }
          ]
        }
    ]
}

;

      service.getHomeData().subscribe((data: HomeModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/home.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getHomeData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/home.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
