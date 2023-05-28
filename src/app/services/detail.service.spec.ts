import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";


import { DetailService } from "./detail.service";
import { DetailModel } from "../models/detail.model";

describe("DetailService", () => {
  let service: DetailService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailService],
    });

    service = TestBed.inject(DetailService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("getDetailData", () => {
    it("should return detail data", () => {
      const mockResponse: DetailModel = {
    "title": "The Big Bang Theory",
    "desc": "Physicists Leonard and Sheldon find their nerd-centric social circle with pals Howard and Raj expanding when aspiring actress Penny moves in next door.",
    "match": 97,
    "cast": ["Johnny Galecki", "Jim Parsons", "Kaley Cuoco"],
    "spotlight": "../../../../assets/data/detail/detail-preview.mp4",
    "year": 2018,
    "seasons": 12,
    "episodes": [
        {
            "id": 1,
            "title": "Pilot",
            "duration": "22m",
            "desc": "When a pretty girl named Penny moves across the hall, socially awkward scientist Leonard is instantly smitten, much to roommate Sheldon's dismay."
        },
        {
            "id": 2,
            "title": "The Big Bran Hypothesis",
            "duration": "21m",
            "desc": "Leonard offers to receive a package on Penny's behalf, but things go awry when Sheldon feels the need to clean her apartment."
        },
        {
            "id": 3,
            "title": "The Fuzzy Boots Corollary",
            "duration": "21m",
            "desc": "Leonard is devastated when he sees Penny kissing another man, and he asks her out on a date under the guise of a group dinner with the guys."
        },
        {
            "id": 4,
            "title": "The Luminous Fish Effect",
            "duration": "20m",
            "desc": "Leonard calls in Sheldon's mother when Sheldon becomes obsessed with weaving ponchos and illuminating fish after being fired from his job."
        },
        {
            "id": 5,
            "title": "The Hamburger Postulate",
            "duration": "20m",
            "desc": "After agreeing to a sexual encounter with Leslie, Leonard becomes upset when he learns she was only interested in him as a one-night stand."
        }
    ]
}
;

      service.getDetailData().subscribe((data: DetailModel) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpTestingController.expectOne("../../assets/data/detail/detail.json");
      expect(req.request.method).toEqual("GET");
      req.flush(mockResponse);
    });

    it("should handle error if API request fails", () => {
      const mockError = new Error("API Error") as any;

      service.getDetailData().subscribe(
        () => fail("Expected an error, but received data"),
        (error: Error) => {
          expect(error).toEqual(mockError);
        }
      );

      const req = httpTestingController.expectOne("../../assets/data/detail/detail.json");
      expect(req.request.method).toEqual("GET");
      req.error(mockError);
    });
  });
});
