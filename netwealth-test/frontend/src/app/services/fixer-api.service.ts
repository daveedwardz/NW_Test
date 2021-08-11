import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FixerApiService {

  constructor(
    private http: HttpClient,
  ) { }

  securityKey = {
    headers: new HttpHeaders({
      "Ocp-Apim-Subscription-Key": "37e0cd7f849f4712bc7b870be4194afc"
    })
  };

  getCurrencies() {
    return this.http.get("https://exchange-rates.azure-api.net/fixerRates/symbols", this.securityKey).pipe(
      map((results: any) => results.symbols)
    );
  }

  convert(amount: number, from: string, to: string) {
    const params: any = {
      amount: amount,
      from: from,
      to: to
    }
    const apiEndpoint = "https://exchange-rates.azure-api.net/fixerRates/convert";
    const url = [
      apiEndpoint,
      Object.keys(params)
        .map(param => `${param}=${params[param]}`)
        .join("&")
    ].join("?");

    return this.http.get(url, this.securityKey).pipe( map((results: any) => results.convertedAmount)); 
  }
}
