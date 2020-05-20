import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

const URL_API = environment.API.EndPoint.Northwind;

@Injectable({
  providedIn: "root",
})
export class NorthwindService {
  constructor(private http: HttpClient) {}

  getTop5(dimension: string, orden: string) {
    return this.http.get(`${URL_API}Top5/${dimension}/${orden}`);
  }

  getSerieHistorica(dimension: string, orden: string) {
    return this.http.get(`${URL_API}Top5Year/${dimension}/${orden}`);
  }

  getDimensionItemsByName(dimension: string, orden: string) {
    return this.http.get(
      `${URL_API}GetDimensionItemsByName/${dimension}/${orden}`
    );
  }
}
